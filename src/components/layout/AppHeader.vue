<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/auth.js'
import { useRouter, useRoute } from 'vue-router'
import { useTheme } from '@/composables/useTheme.js'

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()
const { isDark, toggle } = useTheme()
const mobileOpen = ref(false)

watch(() => route.path, () => { mobileOpen.value = false })

function handleLogout() {
  auth.logout()
  mobileOpen.value = false
  router.push({ name: 'login' })
}

function closeMobile() {
  mobileOpen.value = false
}
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-white/5 bg-dm-navy-900/95 backdrop-blur-md">
    <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

      <!-- Logo -->
      <RouterLink :to="{ name: 'about' }" class="flex-shrink-0" @click="closeMobile">
        <img
          src="/brand/icon-gold.png"
          alt="Dupla de Milheiros"
          class="h-8 w-auto object-contain sm:h-9"
        />
      </RouterLink>

      <!-- Nav desktop -->
      <nav class="hidden items-center gap-7 md:flex">
        <RouterLink
          :to="{ name: 'course-list' }"
          class="text-sm font-medium text-dm-navy-100 transition-colors hover:text-dm-gold"
          active-class="text-dm-gold"
        >
          Cursos
        </RouterLink>
        <RouterLink
          :to="{ name: 'about' }"
          class="text-sm font-medium text-dm-navy-100 transition-colors hover:text-dm-gold"
          active-class="text-dm-gold"
        >
          Sobre a Dupla
        </RouterLink>

        <span class="h-4 w-px bg-white/10" />

        <template v-if="auth.isAuthenticated">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="text-sm font-medium text-dm-navy-100 transition-colors hover:text-dm-gold"
            active-class="text-dm-gold"
          >
            Meus Cursos
          </RouterLink>
          <RouterLink
            :to="{ name: 'certificates' }"
            class="text-sm font-medium text-dm-navy-100 transition-colors hover:text-dm-gold"
            active-class="text-dm-gold"
          >
            Certificados
          </RouterLink>
          <button
            class="rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-dm-navy-200 transition-all hover:border-dm-gold/50 hover:text-dm-gold"
            @click="handleLogout"
          >
            Sair
          </button>
        </template>
        <template v-else>
          <RouterLink
            :to="{ name: 'login' }"
            class="text-sm font-medium text-dm-navy-100 transition-colors hover:text-dm-gold"
            active-class="text-dm-gold"
          >
            Entrar
          </RouterLink>
          <RouterLink
            :to="{ name: 'register' }"
            class="rounded-full bg-dm-gold px-5 py-1.5 text-sm font-semibold text-dm-navy-900 shadow-md shadow-dm-gold/20 transition-all hover:brightness-110"
          >
            Começar agora
          </RouterLink>
        </template>

        <!-- Toggle tema -->
        <button
          class="flex h-8 w-8 items-center justify-center rounded-full text-dm-navy-200 transition-colors hover:bg-white/8 hover:text-dm-gold"
          :title="isDark ? 'Modo claro' : 'Modo escuro'"
          @click="toggle"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
      </nav>

      <!-- Mobile: toggle + hambúrguer -->
      <div class="flex items-center gap-1 md:hidden">
        <button
          class="flex h-9 w-9 items-center justify-center rounded-full text-dm-navy-200 transition-colors hover:bg-white/8 hover:text-dm-gold"
          @click="toggle"
        >
          <svg v-if="isDark" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <button
          class="flex h-9 w-9 items-center justify-center rounded-full text-dm-navy-200 transition-colors hover:bg-white/8"
          :aria-label="mobileOpen ? 'Fechar menu' : 'Abrir menu'"
          @click="mobileOpen = !mobileOpen"
        >
          <svg v-if="mobileOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Mobile menu -->
    <nav
      v-if="mobileOpen"
      class="border-t border-white/5 bg-dm-navy-900 px-4 pb-5 pt-3 md:hidden"
    >
      <div class="flex flex-col gap-1">
        <RouterLink
          :to="{ name: 'course-list' }"
          class="rounded-xl px-4 py-2.5 text-sm font-medium text-dm-navy-100 transition-colors hover:bg-white/5 hover:text-dm-gold"
          active-class="text-dm-gold bg-white/5"
          @click="closeMobile"
        >Cursos</RouterLink>
        <RouterLink
          :to="{ name: 'about' }"
          class="rounded-xl px-4 py-2.5 text-sm font-medium text-dm-navy-100 transition-colors hover:bg-white/5 hover:text-dm-gold"
          active-class="text-dm-gold bg-white/5"
          @click="closeMobile"
        >Sobre nós</RouterLink>

        <div class="my-2 h-px bg-white/5" />

        <template v-if="auth.isAuthenticated">
          <RouterLink
            :to="{ name: 'dashboard' }"
            class="rounded-xl px-4 py-2.5 text-sm font-medium text-dm-navy-100 transition-colors hover:bg-white/5 hover:text-dm-gold"
            active-class="text-dm-gold bg-white/5"
            @click="closeMobile"
          >Meus Cursos</RouterLink>
          <RouterLink
            :to="{ name: 'certificates' }"
            class="rounded-xl px-4 py-2.5 text-sm font-medium text-dm-navy-100 transition-colors hover:bg-white/5 hover:text-dm-gold"
            active-class="text-dm-gold bg-white/5"
            @click="closeMobile"
          >Certificados</RouterLink>
          <button
            class="mt-1 rounded-xl px-4 py-2.5 text-left text-sm font-medium text-dm-navy-200 transition-colors hover:bg-white/5 hover:text-dm-gold"
            @click="handleLogout"
          >Sair</button>
        </template>
        <template v-else>
          <RouterLink
            :to="{ name: 'login' }"
            class="rounded-xl px-4 py-2.5 text-sm font-medium text-dm-navy-100 transition-colors hover:bg-white/5 hover:text-dm-gold"
            @click="closeMobile"
          >Entrar</RouterLink>
          <RouterLink
            :to="{ name: 'register' }"
            class="mt-1 rounded-full bg-dm-gold px-4 py-2.5 text-center text-sm font-semibold text-dm-navy-900"
            @click="closeMobile"
          >Começar agora</RouterLink>
        </template>
      </div>
    </nav>
  </header>
</template>
