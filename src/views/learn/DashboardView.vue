<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { enrollmentService } from '@/services/enrollmentService.js'
import { certificateService } from '@/services/certificateService.js'
import { parseDRFError } from '@/utils/errors.js'

import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
import CourseProgress from '@/components/course/CourseProgress.vue'
import RevealSection from '@/components/ui/RevealSection.vue'
import UserAvatar from '@/components/ui/UserAvatar.vue'

const router = useRouter()
const auth = useAuthStore()

const enrollments = ref([])
const certificates = ref([])
const loading = ref(true)
const error = ref('')

const DIFFICULTY_LABELS = { BEG: 'Iniciante', INT: 'Intermediário', ADV: 'Avançado' }

const activeEnrollments = computed(() => enrollments.value.filter((e) => e.is_active))

const singleEnrollment = computed(() =>
  activeEnrollments.value.length === 1 ? activeEnrollments.value[0] : null,
)

const stats = computed(() => {
  const inProgress = activeEnrollments.value.filter((e) => !e.completed).length
  const completed = activeEnrollments.value.filter((e) => e.completed).length
  const certs = certificates.value.filter((c) => c.is_valid).length
  const totalSeconds = activeEnrollments.value.reduce(
    (sum, e) => sum + (e.total_watched_duration || 0),
    0,
  )
  const hours = Math.round((totalSeconds / 3600) * 10) / 10
  return { inProgress, completed, certs, hours }
})

const greeting = computed(() => {
  const h = new Date().getHours()
  if (h < 12) return 'Bom dia'
  if (h < 18) return 'Boa tarde'
  return 'Boa noite'
})

onMounted(async () => {
  const [enrollRes, certRes] = await Promise.allSettled([
    enrollmentService.getEnrollments(),
    certificateService.getCertificates(),
  ])

  if (enrollRes.status === 'fulfilled') {
    const data = enrollRes.value.data
    enrollments.value = Array.isArray(data) ? data : (data.results ?? [])
  } else {
    error.value = parseDRFError(enrollRes.reason)
  }

  if (certRes.status === 'fulfilled') {
    const data = certRes.value.data
    certificates.value = Array.isArray(data) ? data : (data.results ?? [])
  }
  // Certificados falham silenciosamente — stat fica em 0; não bloqueia o dashboard.

  loading.value = false
})
</script>

<template>
  <PageWrapper :full="true">

    <!-- Hero pessoal -->
    <section class="hero-glow bg-white px-4 pb-12 pt-20 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-6xl">
        <RevealSection animation="up" class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <UserAvatar :icon="auth.profile.icon" :color="auth.profile.color" size="xl" />
          <div>
            <p class="text-xs font-semibold uppercase tracking-widest text-dm-gold">{{ greeting }}</p>
            <h1 class="mt-1 font-display text-4xl font-bold text-dm-navy-900 sm:text-5xl dark:text-white">
              Olá, {{ auth.user?.first_name || 'aluno' }}
            </h1>
            <p class="mt-2 text-slate-500 dark:text-dm-navy-200">Continue de onde parou</p>
          </div>
        </RevealSection>

        <!-- Stats -->
        <RevealSection
          animation="up"
          :delay="100"
          class="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4"
        >
          <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/8 dark:bg-white/3">
            <p class="font-display text-2xl font-bold text-dm-navy-900 dark:text-white">
              {{ loading ? '—' : stats.inProgress }}
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-dm-navy-200">Em andamento</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/8 dark:bg-white/3">
            <p class="font-display text-2xl font-bold text-dm-navy-900 dark:text-white">
              {{ loading ? '—' : stats.completed }}
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-dm-navy-200">Concluídos</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/8 dark:bg-white/3">
            <p class="font-display text-2xl font-bold text-dm-navy-900 dark:text-white">
              {{ loading ? '—' : stats.certs }}
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-dm-navy-200">Certificados</p>
          </div>
          <div class="rounded-2xl border border-slate-200 bg-white p-4 dark:border-white/8 dark:bg-white/3">
            <p class="font-display text-2xl font-bold text-dm-navy-900 dark:text-white">
              {{ loading ? '—' : `${stats.hours}h` }}
            </p>
            <p class="mt-1 text-xs text-slate-500 dark:text-dm-navy-200">de estudo</p>
          </div>
        </RevealSection>
      </div>
    </section>

    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- Conteúdo -->
    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-6xl">

        <!-- Skeletons -->
        <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 3" :key="n" class="animate-pulse overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/5 dark:bg-white/3">
            <div class="aspect-video w-full bg-slate-100 dark:bg-dm-navy-800" />
            <div class="p-5 space-y-3">
              <div class="h-4 w-3/4 rounded-full bg-slate-100 dark:bg-dm-navy-700" />
              <div class="h-3 w-1/2 rounded-full bg-slate-100 dark:bg-dm-navy-700" />
              <div class="h-2 rounded-full bg-slate-100 dark:bg-dm-navy-700" />
            </div>
          </div>
        </div>

        <!-- Erro -->
        <div v-else-if="error" class="flex flex-col items-center gap-4 py-24">
          <AppAlert variant="error" class="w-full max-w-md">
            {{ error }}
          </AppAlert>
          <AppButton variant="secondary" @click="router.go(0)">Tentar novamente</AppButton>
        </div>

        <!-- Estado vazio -->
        <div v-else-if="activeEnrollments.length === 0" class="flex flex-col items-center gap-5 py-24 text-center">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-dm-gold/10">
            <img src="/brand/icon-gold.png" alt="" class="h-10 w-auto object-contain opacity-60" style="max-width: 40px" />
          </div>
          <div>
            <p class="font-display text-xl font-semibold text-dm-navy-900 dark:text-white">Você ainda não tem cursos</p>
            <p class="mt-1 text-sm text-slate-500 dark:text-dm-navy-200">Explore o catálogo e comece a aprender</p>
          </div>
          <AppButton @click="router.push({ name: 'course-list' })">Ver catálogo</AppButton>
        </div>

        <!-- Single course mode -->
        <RevealSection v-else-if="singleEnrollment" animation="up">
          <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-lg dark:border-white/8 dark:bg-white/3 lg:grid lg:grid-cols-2">
            <!-- Thumbnail -->
            <div class="aspect-video bg-slate-100 lg:aspect-auto dark:bg-dm-navy-800">
              <img
                v-if="singleEnrollment.course.thumbnail"
                :src="singleEnrollment.course.thumbnail"
                :alt="singleEnrollment.course.title"
                class="h-full w-full object-cover"
              />
              <div v-else class="flex h-full items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-slate-300 dark:text-dm-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.893L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                </svg>
              </div>
            </div>

            <!-- Info -->
            <div class="flex flex-col justify-center gap-5 p-6 sm:p-8">
              <div>
                <span
                  v-if="singleEnrollment.completed"
                  class="inline-block rounded-full bg-dm-gold/10 px-2.5 py-0.5 text-xs font-semibold text-dm-gold"
                >Concluído</span>
                <h2 class="mt-2 font-display text-2xl font-bold text-dm-navy-900 dark:text-white">
                  {{ singleEnrollment.course.title }}
                </h2>
                <p v-if="singleEnrollment.course.instructor_name" class="mt-1 text-sm text-slate-500 dark:text-dm-navy-200">
                  {{ singleEnrollment.course.instructor_name }}
                </p>
                <p v-if="singleEnrollment.course.difficulty" class="mt-0.5 text-xs text-slate-400 dark:text-dm-navy-200/70">
                  {{ DIFFICULTY_LABELS[singleEnrollment.course.difficulty] ?? singleEnrollment.course.difficulty }}
                </p>
              </div>

              <CourseProgress :percentage="singleEnrollment.progress_percentage" />

              <AppButton
                :variant="singleEnrollment.completed ? 'secondary' : 'primary'"
                @click="router.push({ name: 'player', params: { enrollmentId: singleEnrollment.id } })"
              >
                {{ singleEnrollment.completed ? 'Rever curso' : 'Continuar aprendendo' }}
              </AppButton>
            </div>
          </div>
        </RevealSection>

        <!-- Multi-course grid -->
        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RevealSection
            v-for="(enrollment, i) in activeEnrollments"
            :key="enrollment.id"
            animation="up"
            :delay="(i % 3) * 100"
          >
            <div class="flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200 dark:border-white/8 dark:bg-white/3 dark:hover:border-dm-gold/25 dark:hover:shadow-dm-gold/8">
              <div class="aspect-video w-full overflow-hidden bg-slate-100 dark:bg-dm-navy-800">
                <img
                  v-if="enrollment.course.thumbnail"
                  :src="enrollment.course.thumbnail"
                  :alt="enrollment.course.title"
                  class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div v-else class="flex h-full items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-slate-300 dark:text-dm-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.893L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                </div>
              </div>

              <div class="flex flex-1 flex-col gap-4 p-5">
                <div class="flex-1">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="font-display font-semibold leading-snug text-dm-navy-900 line-clamp-2 dark:text-white">
                      {{ enrollment.course.title }}
                    </h3>
                    <span
                      v-if="enrollment.completed"
                      class="flex-shrink-0 rounded-full bg-dm-gold/10 px-2.5 py-0.5 text-xs font-semibold text-dm-gold"
                    >Concluído</span>
                  </div>
                  <p v-if="enrollment.course.instructor_name" class="mt-1.5 text-sm text-slate-500 dark:text-dm-navy-200">
                    {{ enrollment.course.instructor_name }}
                  </p>
                  <p v-if="enrollment.course.difficulty" class="mt-0.5 text-xs text-slate-400 dark:text-dm-navy-200/70">
                    {{ DIFFICULTY_LABELS[enrollment.course.difficulty] ?? enrollment.course.difficulty }}
                  </p>
                </div>

                <CourseProgress :percentage="enrollment.progress_percentage" />

                <AppButton
                  full
                  :variant="enrollment.completed ? 'secondary' : 'primary'"
                  @click="router.push({ name: 'player', params: { enrollmentId: enrollment.id } })"
                >
                  {{ enrollment.completed ? 'Rever curso' : 'Continuar' }}
                </AppButton>
              </div>
            </div>
          </RevealSection>
        </div>

      </div>
    </section>

  </PageWrapper>
</template>
