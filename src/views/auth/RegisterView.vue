<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useForm, useField } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue-sonner'

import { useAuthStore } from '@/stores/auth.js'
import { extractFieldErrors, parseDRFError } from '@/utils/errors.js'
import AppInput from '@/components/ui/AppInput.vue'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
const auth = useAuthStore()

const schema = yup.object({
  name: yup.string().min(2, 'Nome muito curto').required('Nome obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup
    .string()
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .required('Senha obrigatória'),
})

const { handleSubmit, isSubmitting, setErrors } = useForm({ validationSchema: schema })
const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const globalError = ref('')

const onSubmit = handleSubmit(async (values) => {
  globalError.value = ''
  try {
    await auth.register(values)
    toast.success('Conta criada! Faça login para continuar.')
    router.push({ name: 'login' })
  } catch (error) {
    const fieldErrors = extractFieldErrors(error, ['name', 'email', 'password'])
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
        <h1 class="text-2xl font-bold text-gray-900">Criar conta</h1>
        <p class="mt-2 text-sm text-gray-500">Comece a aprender hoje mesmo</p>
      </div>

      <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
        <AppInput
          id="name"
          v-model="name"
          label="Nome completo"
          placeholder="Seu nome"
          autocomplete="name"
          :error="nameError"
        />

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
          placeholder="Mínimo 8 caracteres"
          autocomplete="new-password"
          :error="passwordError"
        />

        <p v-if="globalError" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          {{ globalError }}
        </p>

        <AppButton type="submit" :loading="isSubmitting" full>
          {{ isSubmitting ? 'Criando conta...' : 'Criar conta' }}
        </AppButton>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500">
        Já tem conta?
        <RouterLink :to="{ name: 'login' }" class="font-medium text-gray-900 hover:underline">
          Entrar
        </RouterLink>
      </p>
    </div>
  </div>
</template>
