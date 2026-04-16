<template>
  <footer class="border-t border-gray-200 bg-white transition-colors duration-300 dark:border-chalk-700 dark:bg-chalk-950">
    <div class="mx-auto max-w-7xl px-4 py-8">
      <div class="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
        <!-- Marca -->
        <div>
          <span class="bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-400 bg-clip-text text-lg font-bold tracking-widest text-transparent uppercase">
            NousFlow
          </span>
          <p class="mt-1 text-xs text-gray-400 dark:text-chalk-500">Aprendizado que transforma</p>
        </div>

        <!-- Links -->
        <nav class="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 dark:text-chalk-400">
          <RouterLink
            :to="{ name: 'course-list' }"
            class="transition-colors hover:text-gray-900 dark:hover:text-chalk-100"
          >
            Cursos
          </RouterLink>
          <RouterLink
            :to="{ name: 'about' }"
            class="transition-colors hover:text-gray-900 dark:hover:text-chalk-100"
          >
            Sobre nós
          </RouterLink>
          <a
            href="mailto:contato@nousflow.com"
            class="flex items-center gap-1.5 transition-colors hover:text-gray-900 dark:hover:text-chalk-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contato@nousflow.com
          </a>
        </nav>
      </div>

      <!-- Copyright -->
      <div class="mt-6 border-t border-gray-100 pt-6 dark:border-chalk-800">
        <p class="text-xs text-gray-400 dark:text-chalk-600">
          © {{ new Date().getFullYear() }} NousFlow. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
