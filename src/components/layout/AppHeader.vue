<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'

const auth = useAuthStore()
const router = useRouter()
const { isDark, toggle } = useTheme()

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="border-b border-gray-200 bg-white transition-colors duration-300 dark:border-chalk-700 dark:bg-chalk-950">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
      <!-- Logo NousFlow -->
      <RouterLink :to="{ name: 'course-list' }" class="select-none">
        <span class="bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-400 bg-clip-text text-xl font-bold tracking-widest text-transparent uppercase">
          NousFlow
        </span>
      </RouterLink>

      <nav class="flex items-center gap-4">
        <template v-if="auth.isAuthenticated">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-chalk-400 dark:hover:text-chalk-100"
          >
            Meus Cursos
          </RouterLink>
          <RouterLink
            :to="{ name: 'certificates' }"
            class="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-chalk-400 dark:hover:text-chalk-100"
          >
            Certificados
          </RouterLink>
          <button
            class="rounded-md bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-gray-200 dark:bg-chalk-700 dark:text-chalk-200 dark:hover:bg-chalk-600"
            @click="handleLogout"
          >
            Sair
          </button>
        </template>
        <template v-else>
          <RouterLink
            :to="{ name: 'login' }"
            class="text-sm text-gray-600 transition-colors hover:text-gray-900 dark:text-chalk-400 dark:hover:text-chalk-100"
          >
            Entrar
          </RouterLink>
          <RouterLink
            :to="{ name: 'register' }"
            class="rounded-md bg-gradient-to-r from-emerald-600 to-teal-500 px-3 py-1.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Cadastrar
          </RouterLink>
        </template>

        <!-- Toggle de tema -->
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900 dark:text-chalk-400 dark:hover:bg-chalk-700 dark:hover:text-chalk-100"
          :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
          @click="toggle"
        >
          <!-- Sol (tema claro ativo) -->
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <!-- Lua (tema escuro ativo) -->
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </nav>
    </div>
  </header>
</template>
