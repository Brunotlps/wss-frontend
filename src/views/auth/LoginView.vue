<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue-sonner'

import { useAuthStore } from '@/stores/auth.js'
import { extractFieldErrors, parseDRFError } from '@/utils/errors.js'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'
import RevealSection from '@/components/ui/RevealSection.vue'

const router = useRouter()
const route = useRoute()
const auth = useAuthStore()

const schema = yup.object({
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().required('Senha obrigatória'),
})

const { handleSubmit, isSubmitting, setErrors } = useForm({ validationSchema: schema })
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const globalError = ref('')

const onSubmit = handleSubmit(async (values) => {
  globalError.value = ''
  try {
    await auth.login(values)
    toast.success('Bem-vindo de volta!')
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } catch (error) {
    const fieldErrors = extractFieldErrors(error, ['email', 'password'])
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors)
    } else {
      globalError.value = parseDRFError(error)
    }
  }
})
</script>

<template>
  <div class="relative flex min-h-[calc(100vh-65px)] items-center justify-center overflow-hidden bg-slate-50 px-4 py-16 dark:bg-dm-navy-900">
    <!-- Glow decorativo -->
    <div class="pointer-events-none absolute left-1/2 top-0 h-64 w-96 -translate-x-1/2 rounded-full bg-dm-gold/6 blur-3xl dark:bg-dm-gold/8" />

    <RevealSection animation="up" class="relative z-10 w-full max-w-sm">

      <!-- Logo + cabeçalho -->
      <div class="mb-8 text-center">
        <RouterLink :to="{ name: 'about' }">
          <img
            src="/brand/logo-dark.png"
            alt="Dupla de Milheiros"
            class="mx-auto mb-6 h-10 w-auto object-contain"
            style="max-width: 160px"
          />
        </RouterLink>
        <h1 class="font-display text-2xl font-bold text-dm-navy-900 dark:text-white">Entrar na sua conta</h1>
        <p class="mt-2 text-sm text-slate-500 dark:text-dm-navy-200">Acesse e continue aprendendo</p>
      </div>

      <!-- Card do formulário -->
      <div class="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-white/8 dark:bg-white/4 dark:shadow-black/30 dark:backdrop-blur-sm">
        <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
          <AppInput
            id="email"
            v-model="email"
            label="E-mail"
            type="email"
            placeholder="seu@email.com"
            autocomplete="email"
            :error="emailError"
          />

          <AppInput
            id="password"
            v-model="password"
            label="Senha"
            type="password"
            placeholder="••••••••"
            autocomplete="current-password"
            :error="passwordError"
          />

          <p v-if="globalError" class="rounded-xl bg-red-50 px-4 py-2.5 text-sm text-red-600 dark:bg-red-900/30 dark:text-red-400">
            {{ globalError }}
          </p>

          <AppButton type="submit" :loading="isSubmitting" full class="mt-1">
            {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
          </AppButton>
        </form>
      </div>

      <p class="mt-6 text-center text-sm text-slate-500 dark:text-dm-navy-200">
        Não tem conta?
        <RouterLink :to="{ name: 'register' }" class="font-semibold text-dm-gold hover:underline">
          Cadastre-se gratuitamente
        </RouterLink>
      </p>

    </RevealSection>
  </div>
</template>
