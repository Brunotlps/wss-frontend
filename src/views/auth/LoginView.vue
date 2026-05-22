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
  <div class="flex min-h-[calc(100vh-65px)] items-center justify-center bg-dm-navy-900 px-4 py-12">
    <RevealSection animation="up" class="w-full max-w-sm">

      <!-- Logo + cabeçalho -->
      <div class="mb-8 text-center">
        <RouterLink :to="{ name: 'about' }">
          <img src="/brand/logo-dark.png" alt="Dupla de Milheiros" class="mx-auto mb-6 h-10 w-auto" />
        </RouterLink>
        <h1 class="font-display text-2xl font-bold text-white">Entrar na sua conta</h1>
        <p class="mt-2 text-sm text-dm-navy-200">Acesse e continue aprendendo</p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
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

        <p v-if="globalError" class="rounded-xl bg-red-900/30 px-4 py-2.5 text-sm text-red-400">
          {{ globalError }}
        </p>

        <AppButton type="submit" :loading="isSubmitting" full class="mt-1">
          {{ isSubmitting ? 'Entrando...' : 'Entrar' }}
        </AppButton>
      </form>

      <p class="mt-6 text-center text-sm text-dm-navy-200">
        Não tem conta?
        <RouterLink :to="{ name: 'register' }" class="font-semibold text-dm-gold hover:underline">
          Cadastre-se
        </RouterLink>
      </p>

    </RevealSection>
  </div>
</template>
