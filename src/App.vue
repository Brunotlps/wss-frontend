<script setup>
import { onMounted } from 'vue'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth.js'
import { useTheme } from '@/composables/useTheme.js'
import AppHeader from '@/components/layout/AppHeader.vue'

const auth = useAuthStore()
useTheme() // inicializa e aplica a classe .dark no <html>

onMounted(() => {
  auth.initializeAuth()
})
</script>

<template>
  <Toaster position="top-right" rich-colors />
  <div class="min-h-screen bg-pastel-50 transition-colors duration-300 dark:bg-chalk-900">
    <AppHeader />
    <RouterView />
  </div>
</template>
