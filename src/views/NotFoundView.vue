<script setup>
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p class="text-6xl font-bold text-gray-200 dark:text-chalk-700">404</p>
    <h1 class="text-2xl font-semibold text-gray-800 dark:text-chalk-100">Página não encontrada</h1>
    <p class="text-gray-500 dark:text-chalk-400">O endereço que você acessou não existe.</p>
    <AppButton @click="router.push({ name: 'course-list' })">Voltar ao início</AppButton>
  </div>
</template>
