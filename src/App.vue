<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth.js'
import { useTheme } from '@/composables/useTheme.js'

import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import AppAlert from '@/components/ui/AppAlert.vue'
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
  <Toaster position="top-right" rich-colors />
  <div class="flex min-h-screen flex-col bg-white font-sans dark:bg-dm-navy-900">
    <AppAlert v-if="backendOffline" variant="warning" dismissible class="rounded-none border-l-0">
      Serviço temporariamente indisponível. Algumas funcionalidades podem não estar acessíveis.
    </AppAlert>
    <AppHeader />
    <main class="flex-1">
      <RouterView />
    </main>
    <AppFooter v-if="!route.meta.hideFooter" />
  </div>
</template>
