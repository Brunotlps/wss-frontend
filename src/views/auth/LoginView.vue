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

      <p class="mt-6 text-center text-sm text-gray-500 dark:text-navy-300">
        Não tem conta?
        <RouterLink :to="{ name: 'register' }" class="font-semibold text-navy-900 hover:text-gold-600 dark:text-gold-400 dark:hover:text-gold-300">
          Cadastre-se
        </RouterLink>
      </p>
    </div>
  </div>
</template>
