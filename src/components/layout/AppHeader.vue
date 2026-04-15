<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="border-b border-gray-200 bg-white">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <RouterLink :to="{ name: 'course-list' }" class="text-xl font-bold text-gray-900">
        WSS
      </RouterLink>

      <nav class="flex items-center gap-4">
        <template v-if="auth.isAuthenticated">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="text-sm text-gray-600 hover:text-gray-900"
          >
            Meus Cursos
          </RouterLink>
          <RouterLink
            :to="{ name: 'certificates' }"
            class="text-sm text-gray-600 hover:text-gray-900"
          >
            Certificados
          </RouterLink>
          <button
            class="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-200"
            @click="handleLogout"
          >
            Sair
          </button>
        </template>
        <template v-else>
          <RouterLink :to="{ name: 'login' }" class="text-sm text-gray-600 hover:text-gray-900">
            Entrar
          </RouterLink>
          <RouterLink
            :to="{ name: 'register' }"
            class="rounded-md bg-gray-900 px-3 py-1.5 text-sm text-white hover:bg-gray-700"
          >
            Cadastrar
          </RouterLink>
        </template>
      </nav>
    </div>
  </header>
</template>
