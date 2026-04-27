<template>
  <footer class="border-t border-cream-200 bg-white transition-colors duration-300 dark:border-navy-700 dark:bg-navy-950">
    <div class="mx-auto max-w-7xl px-4 py-10">
      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

        <!-- Marca -->
        <div class="lg:col-span-2">
          <div class="flex items-center gap-2">
            <span class="flex h-8 w-8 items-center justify-center rounded-lg bg-gold-500 text-navy-900">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z"/>
              </svg>
            </span>
            <span class="text-base font-bold text-navy-900 dark:text-cream-50">
              Dupla de <span class="text-gold-500">Milheiros</span>
            </span>
          </div>
          <p class="mt-3 max-w-xs text-sm leading-relaxed text-gray-500 dark:text-navy-300">
            Transformando pontos em passagens e conhecimento em liberdade financeira. Aprenda a viajar o mundo gastando muito menos.
          </p>
          <p class="mt-4 text-xs text-gray-400 dark:text-navy-400">
            Com Pedro e Geovana, a Dupla de Milheiros.
          </p>
        </div>

        <!-- Links da plataforma -->
        <div>
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-navy-400">Plataforma</p>
          <nav class="flex flex-col gap-2 text-sm">
            <RouterLink
              :to="{ name: 'course-list' }"
              class="text-gray-500 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-gold-400"
            >
              Cursos
            </RouterLink>
            <RouterLink
              :to="{ name: 'about' }"
              class="text-gray-500 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-gold-400"
            >
              Sobre a Dupla
            </RouterLink>
            <RouterLink
              :to="{ name: 'login' }"
              class="text-gray-500 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-gold-400"
            >
              Entrar
            </RouterLink>
            <RouterLink
              :to="{ name: 'register' }"
              class="text-gray-500 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-gold-400"
            >
              Cadastrar
            </RouterLink>
          </nav>
        </div>

        <!-- Contato -->
        <div>
          <p class="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-navy-400">Contato</p>
          <div class="flex flex-col gap-2 text-sm">
            <a
              href="mailto:contato@duplademilheiros.com.br"
              class="flex items-center gap-1.5 text-gray-500 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-gold-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              contato@duplademilheiros.com.br
            </a>
            <a
              href="https://instagram.com/duplademilheiros"
              target="_blank"
              rel="noopener"
              class="flex items-center gap-1.5 text-gray-500 transition-colors hover:text-navy-900 dark:text-navy-300 dark:hover:text-gold-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @duplademilheiros
            </a>
          </div>
        </div>

      </div>

      <!-- Copyright -->
      <div class="mt-8 border-t border-cream-200 pt-6 dark:border-navy-800">
        <p class="text-xs text-gray-400 dark:text-navy-500">
          © {{ new Date().getFullYear() }} Dupla de Milheiros. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
