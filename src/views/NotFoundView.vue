<script setup>
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p class="text-6xl font-bold text-cream-200 dark:text-navy-700">404</p>
    <h1 class="text-2xl font-semibold text-navy-900 dark:text-cream-50">Página não encontrada</h1>
    <p class="text-gray-500 dark:text-navy-300">O endereço que você acessou não existe.</p>
    <AppButton @click="router.push({ name: 'about' })">Voltar ao início</AppButton>
  </div>
</template>
