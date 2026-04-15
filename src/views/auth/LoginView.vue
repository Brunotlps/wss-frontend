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
        <h1 class="text-2xl font-bold text-gray-900">Entrar na WSS</h1>
        <p class="mt-2 text-sm text-gray-500">Acesse sua conta para continuar aprendendo</p>
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

        <p v-if="globalError" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {{ globalError }}
        </p>

        <AppButton type="submit" :loading="isSubmitting" full>
          {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
        </AppButton>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        Não tem conta?
        <RouterLink :to="{ name: 'register' }" class="font-medium text-gray-900 hover:underline">
          Cadastre-se
        </RouterLink>
      </p>
    </div>
  </div>
</template>
