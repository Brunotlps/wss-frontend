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
import RevealSection from '@/components/ui/RevealSection.vue'

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
const { value: password_confirm, errorMessage: passwordConfirmError } = useField('password_confirm')

const globalError = ref('')

const onSubmit = handleSubmit(async (values) => {
  globalError.value = ''
  try {
    await auth.register(values)
    toast.success('Conta criada! Faça login para continuar.')
    router.push({ name: 'login' })
  } catch (error) {
    const fieldErrors = extractFieldErrors(error, [
      'first_name', 'last_name', 'username', 'email', 'password', 'password_confirm',
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
  <div class="relative flex min-h-[calc(100vh-65px)] items-center justify-center overflow-hidden px-4 py-16">
    <!-- Glow de fundo -->
    <div class="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-dm-gold/8 blur-3xl" />
    <div class="pointer-events-none absolute bottom-0 left-1/4 h-64 w-64 rounded-full bg-dm-navy-700/40 blur-3xl" />

    <RevealSection animation="up" class="relative z-10 w-full max-w-sm">

      <!-- Logo + cabeçalho -->
      <div class="mb-8 text-center">
        <RouterLink :to="{ name: 'about' }">
          <img src="/brand/logo-dark.png" alt="Dupla de Milheiros" class="mx-auto mb-6 h-10 w-auto" />
        </RouterLink>
        <h1 class="font-display text-2xl font-bold text-white">Criar sua conta</h1>
        <p class="mt-2 text-sm text-dm-navy-200">Comece a aprender hoje mesmo</p>
      </div>

      <!-- Card do formulário -->
      <div class="rounded-2xl border border-white/8 bg-white/4 p-8 shadow-2xl shadow-black/40 backdrop-blur-sm">
        <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
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
            label="Usuário"
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

          <p v-if="globalError" class="rounded-xl bg-red-900/30 px-4 py-2.5 text-sm text-red-400">
            {{ globalError }}
          </p>

          <AppButton type="submit" :loading="isSubmitting" full class="mt-1">
            {{ isSubmitting ? 'Criando conta...' : 'Criar conta' }}
          </AppButton>
        </form>
      </div>

      <p class="mt-6 text-center text-sm text-dm-navy-200">
        Já tem conta?
        <RouterLink :to="{ name: 'login' }" class="font-semibold text-dm-gold hover:underline">
          Entrar
        </RouterLink>
      </p>

    </RevealSection>
  </div>
</template>
