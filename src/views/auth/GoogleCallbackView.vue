<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth.js'
import { ACCESS_KEY, REFRESH_KEY } from '@/services/api.js'

const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  const hash = window.location.hash.slice(1)
  const params = new URLSearchParams(hash)

  const access = params.get('access')
  const refresh = params.get('refresh')

  // Remove os tokens da barra de endereço imediatamente
  history.replaceState(null, '', window.location.pathname)

  if (!access || !refresh) {
    toast.error('Falha ao autenticar com Google. Tente novamente.')
    router.replace({ name: 'login' })
    return
  }

  localStorage.setItem(ACCESS_KEY, access)
  localStorage.setItem(REFRESH_KEY, refresh)

  await auth.initializeAuth()

  toast.success('Bem-vindo!')
  router.replace({ name: 'dashboard' })
})
</script>

<template>
  <div class="flex min-h-[calc(100vh-65px)] items-center justify-center">
    <div class="flex flex-col items-center gap-4">
      <svg class="h-8 w-8 animate-spin text-gold-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
      </svg>
      <p class="text-sm text-gray-500 dark:text-navy-300">Autenticando com Google...</p>
    </div>
  </div>
</template>
