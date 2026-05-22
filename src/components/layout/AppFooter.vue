<template>
  <footer class="border-t border-white/8 bg-dm-navy-900">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">

        <!-- Marca -->
        <div class="flex flex-col gap-3">
          <img src="/brand/logo-dark.png" alt="Dupla de Milheiros" class="h-8 w-auto" />
          <p class="max-w-xs text-sm leading-relaxed text-dm-navy-200">
            Aprenda a voar mais longe com seus pontos.
          </p>
        </div>

        <!-- Links -->
        <nav class="flex flex-wrap gap-x-12 gap-y-6 text-sm">
          <div class="flex flex-col gap-3">
            <span class="text-xs font-semibold uppercase tracking-widest text-dm-gold">Plataforma</span>
            <RouterLink :to="{ name: 'course-list' }" class="text-dm-navy-200 transition-colors hover:text-white">Cursos</RouterLink>
            <RouterLink :to="{ name: 'about' }" class="text-dm-navy-200 transition-colors hover:text-white">Sobre nós</RouterLink>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-xs font-semibold uppercase tracking-widest text-dm-gold">Conta</span>
            <RouterLink :to="{ name: 'login' }" class="text-dm-navy-200 transition-colors hover:text-white">Entrar</RouterLink>
            <RouterLink :to="{ name: 'register' }" class="text-dm-navy-200 transition-colors hover:text-white">Cadastrar</RouterLink>
          </div>
        </nav>
      </div>

      <!-- Copyright -->
      <div class="mt-10 border-t border-white/5 pt-6 flex items-center justify-between gap-4">
        <p class="text-xs text-dm-navy-200/60">
          © {{ new Date().getFullYear() }} Dupla de Milheiros. Todos os direitos reservados.
        </p>
        <div class="h-px flex-1 bg-gradient-to-r from-transparent via-dm-gold/20 to-transparent hidden sm:block" />
      </div>
    </div>
  </footer>
</template>
