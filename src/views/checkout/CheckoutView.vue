<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadStripe } from '@stripe/stripe-js'

import { paymentService } from '@/services/paymentService.js'
import { enrollmentService } from '@/services/enrollmentService.js'
import { courseService } from '@/services/courseService.js'
import { formatCents } from '@/utils/formatters.js'
import { parseDRFError } from '@/utils/errors.js'
import AppButton from '@/components/ui/AppButton.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import { useTheme } from '@/composables/useTheme.js'
import { useToast } from '@/composables/useToast.js'

const route = useRoute()
const router = useRouter()
const courseId = Number(route.params.courseId)
const { isDark } = useTheme()
const toast = useToast()

// — Estado da máquina de estados do checkout
// loading | ready | processing | polling | timeout | error
const status = ref('loading')
const errorMessage = ref('')

// — Dados do curso e pagamento
const course = ref(null)
const paymentIntentId = ref(null)
const clientSecret = ref(null)
const amount = ref(null)

// — Stripe
let stripe = null
let cardElement = null

// — Polling
const POLL_INTERVAL = 2000
const MAX_ATTEMPTS = 25
const pollAttempt = ref(0)

async function initCheckout() {
  try {
    // Carrega curso e cria PaymentIntent em paralelo
    const [courseRes, intentRes] = await Promise.all([
      courseService.getCourse(courseId),
      paymentService.createPaymentIntent(courseId),
    ])

    course.value = courseRes.data
    clientSecret.value = intentRes.data.client_secret
    paymentIntentId.value = intentRes.data.payment_intent_id
    amount.value = intentRes.data.amount

    // Renderiza o formulário primeiro, depois monta o Stripe no div existente
    status.value = 'ready'
    await nextTick()
    await mountStripeElements()
  } catch (error) {
    const data = error.response?.data
    const detail = typeof data?.detail === 'string' ? data.detail : ''

    if (error.response?.status === 400 && detail.toLowerCase().includes('matriculado')) {
      toast.info('Você já está matriculado', { description: 'Redirecionando para o dashboard.' })
      router.push({ name: 'dashboard' })
      return
    }

    if (!error.response) {
      errorMessage.value = error.message || 'Não foi possível carregar o formulário de pagamento.'
    } else {
      errorMessage.value = parseDRFError(error)
    }
    status.value = 'error'
  }
}

async function mountStripeElements() {
  stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
  if (!stripe) {
    throw new Error('Não foi possível inicializar o sistema de pagamento. Verifique sua conexão e tente novamente.')
  }
  const elements = stripe.elements()
  cardElement = elements.create('card', {
    hidePostalCode: true,
    style: {
      base: {
        fontSize: '16px',
        color: isDark.value ? '#f7f7f7' : '#111827',
        fontFamily: 'ui-sans-serif, system-ui, sans-serif',
        '::placeholder': { color: isDark.value ? '#9898ee' : '#9ca3af' },
      },
      invalid: { color: '#ef4444' },
    },
  })
  cardElement.mount('#stripe-card-element')
}

async function handleSubmit() {
  if (status.value !== 'ready') return
  status.value = 'processing'
  errorMessage.value = ''

  const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret.value, {
    payment_method: { card: cardElement },
  })

  if (error) {
    errorMessage.value = error.message
    status.value = 'ready'
    return
  }

  if (paymentIntent.status === 'succeeded') {
    status.value = 'polling'
    const enrollment = await pollForEnrollment()

    if (enrollment) {
      toast.success('Matrícula confirmada!', { description: 'Bom aprendizado. Seu progresso é salvo automaticamente.' })
      router.push({ name: 'player', params: { enrollmentId: enrollment.id } })
    } else {
      status.value = 'timeout'
    }
  }
}

async function pollForEnrollment() {
  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    pollAttempt.value = i + 1
    try {
      const { data } = await enrollmentService.getEnrollments()
      const list = Array.isArray(data) ? data : (data.results ?? [])
      const found = list.find((e) => e.course.id === courseId)
      if (found) return found
    } catch (err) {
      console.warn('[poll] erro ao buscar matrículas:', err?.message)
    }
    if (i < MAX_ATTEMPTS - 1) {
      await new Promise((resolve) => setTimeout(resolve, POLL_INTERVAL))
    }
  }
  return null
}

onMounted(() => {
  initCheckout()
})

onUnmounted(() => {
  cardElement?.destroy()
})
</script>

<template>
  <PageWrapper :full="true">
    <section class="min-h-[calc(100vh-4rem)] bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-lg">
        <h1 class="mb-8 font-display text-2xl font-bold text-dm-navy-900 dark:text-white">Finalizar compra</h1>

        <!-- Loading inicial -->
        <div v-if="status === 'loading'" class="space-y-4 animate-pulse">
          <div class="h-6 w-2/3 rounded bg-slate-200 dark:bg-dm-navy-700" />
          <div class="h-40 w-full rounded-xl bg-slate-200 dark:bg-dm-navy-700" />
          <div class="h-12 w-full rounded-full bg-slate-200 dark:bg-dm-navy-700" />
        </div>

        <!-- Erro de inicialização -->
        <div v-else-if="status === 'error'" class="flex flex-col items-center gap-4 py-10 text-center">
          <p class="text-slate-500 dark:text-dm-navy-200">{{ errorMessage }}</p>
          <AppButton variant="secondary" @click="router.push({ name: 'course-list' })">
            Voltar ao catálogo
          </AppButton>
        </div>

        <!-- Timeout do polling -->
        <div v-else-if="status === 'timeout'" class="flex flex-col items-center gap-4 py-10 text-center">
          <div class="rounded-full bg-dm-gold/10 p-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
            </svg>
          </div>
          <div>
            <p class="font-display font-semibold text-dm-navy-900 dark:text-white">Pagamento recebido!</p>
            <p class="mt-1 text-sm text-slate-500 dark:text-dm-navy-200">
              Sua matrícula está sendo processada. Verifique em Meus Cursos em breve.
            </p>
          </div>
          <AppButton @click="router.push({ name: 'dashboard' })">Ir para Meus Cursos</AppButton>
        </div>

        <!-- Formulário de pagamento e estados de polling/processing -->
        <div v-else>
          <!-- Resumo do curso -->
          <div v-if="course" class="mb-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm dark:border-white/8 dark:bg-white/3">
            <img
              v-if="course.thumbnail"
              :src="course.thumbnail"
              :alt="course.title"
              class="h-16 w-24 rounded-lg object-cover"
            />
            <div class="flex-1 min-w-0">
              <p class="truncate font-display font-semibold text-dm-navy-900 dark:text-white">{{ course.title }}</p>
              <p v-if="course.instructor_name" class="text-sm text-slate-500 dark:text-dm-navy-200">{{ course.instructor_name }}</p>
            </div>
            <p class="font-display text-xl font-bold text-dm-gold shrink-0">
              {{ formatCents(amount) }}
            </p>
          </div>

          <!-- Stripe Card Element -->
          <div class="mb-6 rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/8 dark:bg-white/3">
            <p class="mb-4 text-sm font-medium text-slate-600 dark:text-dm-navy-200">Dados do cartão</p>
            <div id="stripe-card-element" class="rounded-lg border border-dm-navy-700 bg-white px-3 py-3" />
            <AppAlert v-if="errorMessage" variant="error" class="mt-3">
              {{ errorMessage }}
            </AppAlert>
          </div>

          <!-- Estado: processando pagamento -->
          <AppAlert v-if="status === 'processing'" variant="info" :icon="false" class="mb-4">
            <div class="flex items-center justify-center gap-3">
              <svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Processando pagamento...
            </div>
          </AppAlert>

          <!-- Estado: aguardando matrícula (polling) -->
          <AppAlert v-else-if="status === 'polling'" variant="info" :icon="false" class="mb-4">
            <div class="flex items-center justify-center gap-3">
              <svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Confirmando sua matrícula... ({{ pollAttempt }}/{{ MAX_ATTEMPTS }})
            </div>
          </AppAlert>

          <AppButton
            type="button"
            full
            :disabled="status === 'processing' || status === 'polling'"
            :loading="status === 'processing' || status === 'polling'"
            @click="handleSubmit"
          >
            {{
              status === 'processing' ? 'Processando...'
              : status === 'polling' ? 'Confirmando matrícula...'
              : `Pagar ${formatCents(amount)}`
            }}
          </AppButton>

          <p class="mt-4 text-center text-xs text-slate-400 dark:text-dm-navy-200">
            Pagamento seguro processado pelo Stripe. Seus dados não são armazenados.
          </p>
        </div>
      </div>
    </section>
  </PageWrapper>
</template>
