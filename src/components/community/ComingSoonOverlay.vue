<template>
  <div class="pointer-events-none absolute inset-0 z-10 flex items-center justify-center px-4">
    <!-- Gradients to fade content toward center -->
    <div class="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-50 to-transparent dark:from-dm-navy-900" />
    <div class="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-slate-50 to-transparent dark:from-dm-navy-900" />

    <!-- Card -->
    <div class="pointer-events-auto relative w-full max-w-sm overflow-hidden rounded-3xl border border-white/20 bg-white/70 p-8 text-center shadow-2xl shadow-black/20 backdrop-blur-2xl dark:border-white/10 dark:bg-dm-navy-900/80">
      <!-- Glow accent -->
      <div class="absolute -top-10 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-dm-gold/20 blur-3xl" />

      <!-- Icon -->
      <div class="relative mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-dm-gold/20 bg-dm-gold/10">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>

      <!-- Badge -->
      <div class="mb-4 inline-flex items-center gap-1.5 rounded-full border border-dm-gold/30 bg-dm-gold/10 px-3 py-1 text-xs font-semibold text-dm-gold">
        <span class="relative flex h-1.5 w-1.5">
          <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-dm-gold opacity-75" />
          <span class="relative inline-flex h-1.5 w-1.5 rounded-full bg-dm-gold" />
        </span>
        Em desenvolvimento
      </div>

      <h2 class="font-display text-xl font-bold text-dm-navy-900 dark:text-white">
        Comunidade chegando em breve
      </h2>
      <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-dm-navy-200">
        Estamos construindo um espaço para você trocar experiências e estratégias com outros alunos.
      </p>

      <!-- CTA — UI only, sem backend -->
      <div class="mt-6">
        <div class="flex overflow-hidden rounded-xl border border-slate-200 bg-white/80 dark:border-white/10 dark:bg-white/5">
          <input
            type="email"
            placeholder="seu@email.com"
            class="flex-1 bg-transparent px-4 py-2.5 text-sm text-dm-navy-900 placeholder-slate-400 outline-none dark:text-white dark:placeholder-dm-navy-300"
          />
          <button
            class="shrink-0 rounded-r-xl bg-dm-gold px-4 py-2.5 text-sm font-semibold text-dm-navy-900 transition-all hover:brightness-110"
          >
            Avise-me
          </button>
        </div>
        <p class="mt-2 text-xs text-slate-400 dark:text-dm-navy-300">
          Seja o primeiro a saber quando lançarmos.
        </p>
      </div>
    </div>
  </div>
</template>
