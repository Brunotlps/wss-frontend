<script setup>
import { ref } from 'vue'

defineProps({
  variant: { type: String, default: 'error' },
  dismissible: { type: Boolean, default: false },
  icon: { type: Boolean, default: true },
})

const dismissed = ref(false)
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 scale-95"
    enter-to-class="opacity-100 scale-100"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 scale-100"
    leave-to-class="opacity-0 scale-95"
  >
    <div
      v-if="!dismissed"
      role="alert"
      :class="[
        'relative flex items-start gap-3.5 overflow-hidden rounded-2xl border px-5 py-4 text-sm shadow-sm backdrop-blur-sm',

        variant === 'error' && [
          'border-red-200 bg-red-50 text-red-800',
          'dark:border-red-500/25 dark:bg-red-950/50 dark:text-red-200 dark:shadow-red-900/20',
        ],
        variant === 'warning' && [
          'border-amber-200 bg-amber-50 text-amber-800',
          'dark:border-dm-gold/25 dark:bg-dm-gold/8 dark:text-dm-gold dark:shadow-dm-gold/10',
        ],
        variant === 'info' && [
          'border-blue-200 bg-blue-50 text-blue-800',
          'dark:border-dm-blue/25 dark:bg-dm-blue/8 dark:text-dm-navy-100 dark:shadow-dm-blue/10',
        ],
        variant === 'success' && [
          'border-emerald-200 bg-emerald-50 text-emerald-800',
          'dark:border-emerald-500/25 dark:bg-emerald-950/50 dark:text-emerald-200 dark:shadow-emerald-900/20',
        ],
      ]"
    >
      <!-- Accent glow (left edge) -->
      <div
        :class="[
          'absolute inset-y-0 left-0 w-1',
          variant === 'error'   && 'bg-red-500',
          variant === 'warning' && 'bg-dm-gold',
          variant === 'info'    && 'bg-dm-blue',
          variant === 'success' && 'bg-emerald-500',
        ]"
      />

      <!-- Icon container -->
      <div
        v-if="icon"
        :class="[
          'flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full',
          variant === 'error'   && 'bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400',
          variant === 'warning' && 'bg-amber-100 text-amber-600 dark:bg-dm-gold/15 dark:text-dm-gold',
          variant === 'info'    && 'bg-blue-100 text-blue-600 dark:bg-dm-blue/15 dark:text-dm-blue-400',
          variant === 'success' && 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/15 dark:text-emerald-400',
        ]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-4.5 w-4.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <template v-if="variant === 'error'">
            <circle cx="12" cy="12" r="10" />
            <path stroke-linecap="round" d="M15 9l-6 6M9 9l6 6" />
          </template>

          <template v-else-if="variant === 'warning'">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </template>

          <template v-else-if="variant === 'info'">
            <circle cx="12" cy="12" r="10" />
            <path stroke-linecap="round" d="M12 16v-4M12 8h.01" />
          </template>

          <template v-else>
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </template>
        </svg>
      </div>

      <!-- Content -->
      <div class="flex-1 self-center leading-relaxed">
        <slot />
      </div>

      <!-- Dismiss button -->
      <button
        v-if="dismissible"
        type="button"
        :class="[
          'flex-shrink-0 self-center rounded-lg p-1.5 transition-all hover:scale-110 focus:outline-none focus-visible:ring-2',
          variant === 'error'   && 'text-red-400 hover:bg-red-100 hover:text-red-600 focus-visible:ring-red-400 dark:hover:bg-red-500/15',
          variant === 'warning' && 'text-amber-400 hover:bg-amber-100 hover:text-amber-600 focus-visible:ring-amber-400 dark:text-dm-gold/60 dark:hover:bg-dm-gold/15 dark:hover:text-dm-gold',
          variant === 'info'    && 'text-blue-400 hover:bg-blue-100 hover:text-blue-600 focus-visible:ring-blue-400 dark:hover:bg-dm-blue/15',
          variant === 'success' && 'text-emerald-400 hover:bg-emerald-100 hover:text-emerald-600 focus-visible:ring-emerald-400 dark:hover:bg-emerald-500/15',
        ]"
        @click="dismissed = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>
