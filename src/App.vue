<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth.js'
import { useTheme } from '@/composables/useTheme.js'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import api from '@/services/api.js'

const auth = useAuthStore()
const route = useRoute()
const { isDark } = useTheme()

const backendOffline = ref(false)

onMounted(async () => {
  auth.initializeAuth()
  try {
    await api.get('/api/health/')
  } catch {
    backendOffline.value = true
  }
})
</script>

<template>
  <Toaster position="top-right" rich-colors close-button :theme="isDark ? 'dark' : 'light'" />
  <div class="flex min-h-screen flex-col bg-pastel-50 transition-colors duration-300 dark:bg-chalk-900">
    <div
      v-if="backendOffline"
      class="flex items-center justify-center gap-2 bg-yellow-50 px-4 py-2 text-sm text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01M12 3a9 9 0 100 18A9 9 0 0012 3z" />
      </svg>
      Serviço temporariamente indisponível. Algumas funcionalidades podem não estar acessíveis.
    </div>
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter v-if="!route.meta.hideFooter" />
  </div>
</template>
