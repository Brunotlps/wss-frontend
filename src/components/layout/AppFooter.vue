<template>
  <footer class="border-t border-slate-200 bg-white dark:border-white/8 dark:bg-dm-navy-900">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="flex flex-col gap-10 sm:flex-row sm:items-start sm:justify-between">

        <!-- Marca -->
        <div class="flex flex-col gap-3">
          <img
            src="/brand/logo-dark.png"
            alt="Dupla de Milheiros"
            class="h-8 w-auto object-contain"
            style="max-width: 160px"
          />
          <p class="max-w-xs text-sm leading-relaxed text-slate-500 dark:text-dm-navy-200">
            Aprenda a voar mais longe com seus pontos.
          </p>
        </div>

        <!-- Links -->
        <nav class="flex flex-wrap gap-x-12 gap-y-6 text-sm">
          <div class="flex flex-col gap-3">
            <span class="text-xs font-semibold uppercase tracking-widest text-dm-gold">Plataforma</span>
            <RouterLink :to="{ name: 'course-list' }" class="text-slate-500 transition-colors hover:text-dm-navy-900 dark:text-dm-navy-200 dark:hover:text-white">Cursos</RouterLink>
            <RouterLink :to="{ name: 'community' }" class="flex items-center gap-2 text-slate-500 transition-colors hover:text-dm-navy-900 dark:text-dm-navy-200 dark:hover:text-white">
              Comunidade
              <span class="rounded-full bg-dm-gold/15 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-dm-gold">Em breve</span>
            </RouterLink>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-xs font-semibold uppercase tracking-widest text-dm-gold">Conta</span>
            <RouterLink :to="{ name: 'login' }" class="text-slate-500 transition-colors hover:text-dm-navy-900 dark:text-dm-navy-200 dark:hover:text-white">Entrar</RouterLink>
            <RouterLink :to="{ name: 'register' }" class="text-slate-500 transition-colors hover:text-dm-navy-900 dark:text-dm-navy-200 dark:hover:text-white">Cadastrar</RouterLink>
          </div>
          <div class="flex flex-col gap-3">
            <span class="text-xs font-semibold uppercase tracking-widest text-dm-gold">Contato</span>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              class="text-slate-500 transition-colors hover:text-dm-navy-900 dark:text-dm-navy-200 dark:hover:text-white"
            >WhatsApp</a>
            <a
              href="mailto:contato@duplaademilheiros.com"
              class="text-slate-500 transition-colors hover:text-dm-navy-900 dark:text-dm-navy-200 dark:hover:text-white"
            >E-mail</a>
          </div>
        </nav>
      </div>

      <!-- Copyright -->
      <div class="mt-10 border-t border-slate-100 pt-6 dark:border-white/5">
        <p class="text-xs text-slate-400 dark:text-dm-navy-200/60">
          © {{ new Date().getFullYear() }} Dupla de Milheiros. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
</template>
