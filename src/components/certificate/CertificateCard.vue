<script setup>
defineProps({
  certificate: { type: Object, required: true },
})

function formatDate(isoString) {
  if (!isoString) return '—'
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(new Date(isoString))
}
</script>

<template>
  <div class="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-white/8 dark:bg-white/3 dark:hover:border-dm-gold/25">
    <!-- Ícone + título -->
    <div class="flex items-start justify-between gap-3">
      <div class="flex items-center gap-3">
        <div class="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-dm-gold/10 shadow-sm">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
          </svg>
        </div>
        <div class="min-w-0">
          <h3 class="font-display font-semibold leading-snug text-dm-navy-900 dark:text-white">{{ certificate.course_title }}</h3>
          <p class="text-sm text-slate-500 dark:text-dm-navy-200">{{ certificate.instructor_name }}</p>
        </div>
      </div>

      <span
        v-if="!certificate.is_valid"
        class="flex-shrink-0 rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-600 dark:bg-red-900/30 dark:text-red-400"
      >
        Revogado
      </span>
    </div>

    <!-- Detalhes -->
    <div class="space-y-1.5 border-t border-slate-100 pt-3 text-sm text-slate-500 dark:border-white/8 dark:text-dm-navy-200">
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span>Emitido em {{ formatDate(certificate.issued_at) }}</span>
      </div>
      <div class="flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 flex-shrink-0 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
        </svg>
        <span class="font-mono text-xs tracking-wider">{{ certificate.certificate_code }}</span>
      </div>
    </div>

    <!-- Download -->
    <a
      :href="certificate.pdf_url"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center justify-center gap-2 rounded-full bg-dm-gold px-4 py-2.5 text-sm font-semibold text-dm-navy-900 shadow-sm shadow-dm-gold/20 transition-all hover:bg-dm-gold-400 hover:shadow-md"
      :class="{ 'pointer-events-none opacity-40': !certificate.is_valid }"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Baixar certificado
    </a>
  </div>
</template>
