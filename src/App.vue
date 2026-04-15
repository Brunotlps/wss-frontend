<script setup>
import { onMounted } from 'vue'
import { Toaster } from 'vue-sonner'
import { useAuthStore } from '@/stores/auth.js'
import AppHeader from '@/components/layout/AppHeader.vue'

const auth = useAuthStore()

onMounted(() => {
  auth.initializeAuth()
})
</script>

<template>
  <Toaster position="top-right" rich-colors />
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    <RouterView />
  </div>
</template>
