<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'
import { useToast } from '@/composables/useToast.js'
import { handleGoogleCallback } from '@/composables/useGoogleCallback.js'

const router = useRouter()
const toast = useToast()
const auth = useAuthStore()

onMounted(() => handleGoogleCallback({ auth, toast, router }))
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
