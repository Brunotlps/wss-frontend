<template>
  <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-white/3">
    <div class="flex items-start gap-3 p-4">
      <!-- Avatar placeholder -->
      <div class="h-9 w-9 shrink-0 rounded-full bg-dm-gold/20" />

      <!-- Input area -->
      <div class="flex-1">
        <div class="min-h-[52px] cursor-not-allowed rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/8 dark:bg-white/3">
          <p class="select-none text-sm text-slate-400 dark:text-dm-navy-300">
            Compartilhe uma dica, estratégia ou experiência de viagem…
          </p>
        </div>
      </div>
    </div>

    <!-- Actions bar -->
    <div class="flex items-center justify-between border-t border-slate-100 px-4 py-3 dark:border-white/5">
      <div class="flex items-center gap-1">
        <!-- Attachment icon -->
        <button disabled class="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-slate-300 dark:text-dm-navy-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>
        <!-- Tag icon -->
        <button disabled class="flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-lg text-slate-300 dark:text-dm-navy-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
        </button>
      </div>
      <button
        disabled
        class="cursor-not-allowed rounded-full bg-dm-gold/30 px-4 py-1.5 text-sm font-semibold text-dm-navy-900/50"
      >
        Publicar
      </button>
    </div>
  </div>
</template>
