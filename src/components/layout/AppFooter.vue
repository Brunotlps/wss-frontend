<template>
  <footer class="border-t border-dm-navy-700 bg-dm-navy-900">
    <div class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">

        <!-- Marca -->
        <div class="flex flex-col gap-2">
          <img src="/brand/logo-dark.png" alt="Dupla de Milheiros" class="h-8 w-auto" />
          <p class="text-sm text-dm-navy-200">Aprenda a voar mais longe com seus pontos.</p>
        </div>

        <!-- Links -->
        <nav class="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <div class="flex flex-col gap-2">
            <span class="text-xs font-semibold uppercase tracking-widest text-dm-gold">Plataforma</span>
            <RouterLink :to="{ name: 'course-list' }" class="text-dm-navy-200 transition-colors hover:text-dm-gold">Cursos</RouterLink>
            <RouterLink :to="{ name: 'about' }" class="text-dm-navy-200 transition-colors hover:text-dm-gold">Sobre nós</RouterLink>
          </div>
          <div class="flex flex-col gap-2">
            <span class="text-xs font-semibold uppercase tracking-widest text-dm-gold">Conta</span>
            <RouterLink :to="{ name: 'login' }" class="text-dm-navy-200 transition-colors hover:text-dm-gold">Entrar</RouterLink>
            <RouterLink :to="{ name: 'register' }" class="text-dm-navy-200 transition-colors hover:text-dm-gold">Cadastrar</RouterLink>
          </div>
        </nav>
      </div>

      <!-- Copyright -->
      <div class="mt-8 border-t border-dm-navy-700 pt-6">
        <p class="text-xs text-dm-navy-200">
          © {{ new Date().getFullYear() }} Dupla de Milheiros. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
