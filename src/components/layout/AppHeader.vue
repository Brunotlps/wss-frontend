<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const { isDark, toggle } = useTheme()

const mobileMenuOpen = ref(false)

watch(() => route.path, () => { mobileMenuOpen.value = false })

function handleLogout() {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <header class="relative border-b border-cream-200 bg-white shadow-sm transition-colors duration-300 dark:border-navy-700 dark:bg-navy-950">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">

      <!-- Logo -->
      <RouterLink :to="{ name: 'about' }" class="flex items-center gap-2 select-none group">
        <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-navy-900 shadow-sm group-hover:bg-gold-400 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
          </svg>
        </span>
        <span class="text-base font-bold tracking-tight text-navy-900 dark:text-cream-50 leading-tight">
          Dupla de<br class="hidden xs:block sm:hidden" />
          <span class="text-gold-500"> Milheiros</span>
        </span>
      </RouterLink>

      <!-- Nav desktop (lg+) -->
      <nav class="hidden lg:flex items-center gap-4">
        <RouterLink
          :to="{ name: 'course-list' }"
          class="text-sm text-gray-600 transition-colors hover:text-navy-900 dark:text-navy-200 dark:hover:text-gold-400"
          :class="{ 'font-semibold text-navy-900 dark:text-gold-500': route.name === 'course-list' }"
        >
          Cursos
        </RouterLink>
        <RouterLink
          :to="{ name: 'about' }"
          class="text-sm text-gray-600 transition-colors hover:text-navy-900 dark:text-navy-200 dark:hover:text-gold-400"
          :class="{ 'font-semibold text-navy-900 dark:text-gold-500': route.name === 'about' }"
        >
          Sobre a Dupla
        </RouterLink>

        <span class="h-4 w-px bg-cream-200 dark:bg-navy-700" />

        <template v-if="auth.isAuthenticated">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="text-sm text-gray-600 transition-colors hover:text-navy-900 dark:text-navy-200 dark:hover:text-gold-400"
            :class="{ 'font-semibold text-navy-900 dark:text-gold-500': route.name === 'dashboard' }"
          >
            Meus Cursos
          </RouterLink>
          <RouterLink
            :to="{ name: 'certificates' }"
            class="text-sm text-gray-600 transition-colors hover:text-navy-900 dark:text-navy-200 dark:hover:text-gold-400"
            :class="{ 'font-semibold text-navy-900 dark:text-gold-500': route.name === 'certificates' }"
          >
            Certificados
          </RouterLink>
          <button
            class="rounded-md border border-cream-200 bg-cream-100 px-3 py-1.5 text-sm text-gray-700 transition-colors hover:bg-cream-200 dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200 dark:hover:bg-navy-700"
            @click="handleLogout"
          >
            Sair
          </button>
        </template>
        <template v-else>
          <RouterLink
            :to="{ name: 'login' }"
            class="text-sm text-gray-600 transition-colors hover:text-navy-900 dark:text-navy-200 dark:hover:text-gold-400"
          >
            Entrar
          </RouterLink>
          <RouterLink
            :to="{ name: 'register' }"
            class="rounded-md bg-gold-500 px-3 py-1.5 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
          >
            Cadastrar
          </RouterLink>
        </template>

        <!-- Toggle de tema -->
        <button
          class="flex h-8 w-8 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-cream-200 hover:text-gray-700 dark:text-navy-300 dark:hover:bg-navy-800 dark:hover:text-gold-400"
          :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
          @click="toggle"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </nav>

      <!-- Controles mobile (< lg) -->
      <div class="flex items-center gap-2 lg:hidden">
        <button
          class="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-cream-200 dark:text-navy-300 dark:hover:bg-navy-800"
          :title="isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'"
          @click="toggle"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>

        <button
          class="flex h-9 w-9 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-cream-200 dark:text-navy-300 dark:hover:bg-navy-800"
          :aria-label="mobileMenuOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="mobileMenuOpen = !mobileMenuOpen"
        >
          <svg v-if="mobileMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu mobile dropdown -->
    <Transition
      enter-active-class="transition duration-150 ease-out"
      enter-from-class="opacity-0 -translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-100 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-1"
    >
      <nav
        v-if="mobileMenuOpen"
        class="absolute left-0 right-0 top-full z-50 border-b border-cream-200 bg-white px-4 pb-4 pt-2 shadow-lg lg:hidden dark:border-navy-700 dark:bg-navy-950"
      >
        <div class="flex flex-col gap-1">
          <RouterLink
            :to="{ name: 'course-list' }"
            class="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-cream-100 hover:text-navy-900 dark:text-navy-200 dark:hover:bg-navy-800 dark:hover:text-gold-400"
          >
            Cursos
          </RouterLink>
          <RouterLink
            :to="{ name: 'about' }"
            class="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-cream-100 hover:text-navy-900 dark:text-navy-200 dark:hover:bg-navy-800 dark:hover:text-gold-400"
          >
            Sobre a Dupla
          </RouterLink>

          <div class="my-1 border-t border-cream-200 dark:border-navy-800" />

          <template v-if="auth.isAuthenticated">
            <RouterLink
              :to="{ name: 'dashboard' }"
              class="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-cream-100 hover:text-navy-900 dark:text-navy-200 dark:hover:bg-navy-800 dark:hover:text-gold-400"
            >
              Meus Cursos
            </RouterLink>
            <RouterLink
              :to="{ name: 'certificates' }"
              class="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-cream-100 hover:text-navy-900 dark:text-navy-200 dark:hover:bg-navy-800 dark:hover:text-gold-400"
            >
              Certificados
            </RouterLink>
            <button
              class="mt-1 w-full rounded-md border border-cream-200 bg-cream-100 px-3 py-2.5 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-cream-200 dark:border-navy-700 dark:bg-navy-800 dark:text-navy-200 dark:hover:bg-navy-700"
              @click="handleLogout"
            >
              Sair
            </button>
          </template>
          <template v-else>
            <RouterLink
              :to="{ name: 'login' }"
              class="rounded-md px-3 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-cream-100 hover:text-navy-900 dark:text-navy-200 dark:hover:bg-navy-800 dark:hover:text-gold-400"
            >
              Entrar
            </RouterLink>
            <RouterLink
              :to="{ name: 'register' }"
              class="mt-1 block rounded-md bg-gold-500 px-3 py-2.5 text-center text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            >
              Cadastrar
            </RouterLink>
          </template>
        </div>
      </nav>
    </Transition>
  </header>
</template>
