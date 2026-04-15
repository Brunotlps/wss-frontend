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
  first_name: yup.string().required('Nome obrigatório'),
  last_name: yup.string().required('Sobrenome obrigatório'),
  username: yup
    .string()
    .min(3, 'Mínimo 3 caracteres')
    .matches(/^[a-zA-Z0-9_]+$/, 'Apenas letras, números e _')
    .required('Nome de usuário obrigatório'),
  email: yup.string().email('E-mail inválido').required('E-mail obrigatório'),
  password: yup.string().min(8, 'Mínimo 8 caracteres').required('Senha obrigatória'),
  password_confirm: yup
    .string()
    .oneOf([yup.ref('password')], 'As senhas não coincidem')
    .required('Confirmação obrigatória'),
})

const { handleSubmit, isSubmitting, setErrors } = useForm({ validationSchema: schema })
const { value: first_name, errorMessage: firstNameError } = useField('first_name')
const { value: last_name, errorMessage: lastNameError } = useField('last_name')
const { value: username, errorMessage: usernameError } = useField('username')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: password_confirm, errorMessage: passwordConfirmError } =
  useField('password_confirm')

const globalError = ref('')

const onSubmit = handleSubmit(async (values) => {
  globalError.value = ''
  try {
    await auth.register(values)
    toast.success('Conta criada! Faça login para continuar.')
    router.push({ name: 'login' })
  } catch (error) {
    const fieldErrors = extractFieldErrors(error, [
      'first_name',
      'last_name',
      'username',
      'email',
      'password',
      'password_confirm',
    ])
    if (Object.keys(fieldErrors).length) {
      setErrors(fieldErrors)
    } else {
      globalError.value = parseDRFError(error)
    }
  }
})
</script>

<template>
  <div class="flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-10">
    <div class="w-full max-w-sm">
      <div class="mb-8 text-center">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-chalk-100">Criar conta</h1>
        <p class="mt-2 text-sm text-gray-500 dark:text-chalk-400">Comece a aprender hoje mesmo</p>
      </div>

      <form class="flex flex-col gap-5" @submit.prevent="onSubmit">
        <div class="grid grid-cols-2 gap-3">
          <AppInput
            id="first_name"
            v-model="first_name"
            label="Nome"
            placeholder="Bruno"
            autocomplete="given-name"
            :error="firstNameError"
          />
          <AppInput
            id="last_name"
            v-model="last_name"
            label="Sobrenome"
            placeholder="Teixeira"
            autocomplete="family-name"
            :error="lastNameError"
          />
        </div>

        <AppInput
          id="username"
          v-model="username"
          label="Nome de usuário"
          placeholder="brunoteixeira"
          autocomplete="username"
          :error="usernameError"
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

        <AppInput
          id="password_confirm"
          v-model="password_confirm"
          label="Confirmar senha"
          type="password"
          placeholder="Repita a senha"
          autocomplete="new-password"
          :error="passwordConfirmError"
        />

        <p v-if="globalError" class="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 dark:bg-red-950 dark:text-red-400">
          {{ globalError }}
        </p>

        <AppButton type="submit" :loading="isSubmitting" full>
          {{ isSubmitting ? 'Criando conta...' : 'Criar conta' }}
        </AppButton>
      </form>

      <p class="mt-6 text-center text-sm text-gray-500 dark:text-chalk-400">
        Já tem conta?
        <RouterLink :to="{ name: 'login' }" class="font-medium text-gray-900 hover:underline dark:text-chalk-100">
          Entrar
        </RouterLink>
      </p>
    </div>
  </div>
</template>
