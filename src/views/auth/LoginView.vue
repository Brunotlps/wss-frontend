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
  <div class="flex min-h-[calc(100vh-65px)] items-center justify-center px-4">
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <!-- Logo mark -->
        <div class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-7 w-7 text-navy-900" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </div>
        <h1 class="text-2xl font-bold text-navy-900 dark:text-cream-50">Entrar na plataforma</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-navy-300">Acesse sua conta para continuar aprendendo</p>
      </div>

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

        <p v-if="globalError" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {{ globalError }}
        </p>

        <AppButton type="submit" :loading="isSubmitting" full>
          {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
        </AppButton>
      </form>

      <!-- Separador -->
      <div class="mt-6 flex items-center gap-3">
        <span class="flex-1 border-t border-cream-200 dark:border-navy-700" />
        <span class="text-xs text-gray-400 dark:text-navy-400">ou</span>
        <span class="flex-1 border-t border-cream-200 dark:border-navy-700" />
      </div>

      <!-- Botão Google -->
      <a
        href="https://api.nousflow.com.br/api/auth/google/"
        class="mt-4 flex w-full items-center justify-center gap-3 rounded-md border border-cream-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-cream-100 dark:border-navy-600 dark:bg-navy-800 dark:text-navy-200 dark:hover:bg-navy-700"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="h-5 w-5 flex-shrink-0">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
        </svg>
        Entrar com Google
      </a>

      <p class="mt-6 text-center text-sm text-gray-500 dark:text-navy-300">
        Não tem conta?
        <RouterLink :to="{ name: 'register' }" class="font-semibold text-navy-900 hover:text-gold-600 dark:text-gold-400 dark:hover:text-gold-300">
          Cadastre-se
        </RouterLink>
      </p>
    </div>
  </div>
</template>
