<script setup>
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'

const router = useRouter()
</script>

<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p class="font-display text-6xl font-bold text-dm-navy-700">404</p>
    <h1 class="font-display text-2xl font-semibold text-white">Página não encontrada</h1>
    <p class="text-dm-navy-200">O endereço que você acessou não existe.</p>
    <AppButton @click="router.push({ name: 'course-list' })">Voltar ao início</AppButton>
  </div>
</template>
