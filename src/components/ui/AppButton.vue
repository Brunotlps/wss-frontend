<script setup>
defineProps({
  variant: { type: String, default: 'primary' }, // primary | secondary | ghost | outline
  type: { type: String, default: 'button' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  full: { type: Boolean, default: false },
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="[
      'inline-flex items-center justify-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      full && 'w-full',
      variant === 'primary' &&
        'bg-dm-gold text-dm-navy-900 hover:bg-dm-gold-400 focus-visible:ring-dm-gold',
      variant === 'secondary' &&
        'bg-dm-navy-800 text-dm-navy-100 hover:bg-dm-navy-700 focus-visible:ring-dm-navy-200 dark:bg-dm-navy-800 dark:text-dm-navy-100',
      variant === 'ghost' &&
        'text-dm-navy-200 hover:bg-dm-navy-800 hover:text-white focus-visible:ring-dm-navy-200 dark:text-dm-navy-200',
      variant === 'outline' &&
        'border border-dm-gold text-dm-gold hover:bg-dm-gold hover:text-dm-navy-900 focus-visible:ring-dm-gold',
    ]"
  >
    <svg
      v-if="loading"
      class="h-4 w-4 animate-spin"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
      />
    </svg>
    <slot />
  </button>
</template>
