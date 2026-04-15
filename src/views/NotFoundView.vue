<template>
  <div class="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
    <p class="text-6xl font-bold text-gray-200">404</p>
    <h1 class="text-2xl font-semibold text-gray-800">Página não encontrada</h1>
    <p class="text-gray-500">O endereço que você acessou não existe.</p>
    <RouterLink
      :to="{ name: 'course-list' }"
      class="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
    >
      Voltar ao início
    </RouterLink>
  </div>
</template>
