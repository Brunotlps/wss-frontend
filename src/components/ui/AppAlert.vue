<script setup>
import { ref } from 'vue'

const props = defineProps({
  variant: { type: String, default: 'error' },
  dismissible: { type: Boolean, default: false },
  icon: { type: Boolean, default: true },
})

const dismissed = ref(false)
</script>

<template>
  <Transition
    enter-active-class="transition duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-1"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-1"
  >
    <div
      v-if="!dismissed"
      role="alert"
      :class="[
        'flex items-start gap-3 rounded-xl border-l-4 px-4 py-3 text-sm',
        variant === 'error' &&
          'border-l-red-500 bg-red-50 text-red-700 dark:bg-red-950/40 dark:text-red-300',
        variant === 'warning' &&
          'border-l-dm-gold bg-dm-gold/10 text-amber-700 dark:text-dm-gold',
        variant === 'info' &&
          'border-l-dm-blue bg-dm-blue/10 text-dm-blue dark:bg-dm-blue/15 dark:text-dm-navy-100',
        variant === 'success' &&
          'border-l-emerald-500 bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300',
      ]"
    >
      <!-- Icon -->
      <svg
        v-if="icon"
        xmlns="http://www.w3.org/2000/svg"
        class="mt-0.5 h-4 w-4 flex-shrink-0"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-width="2"
      >
        <!-- Error: circle-x -->
        <template v-if="variant === 'error'">
          <circle cx="12" cy="12" r="10" />
          <path stroke-linecap="round" d="M15 9l-6 6M9 9l6 6" />
        </template>

        <!-- Warning: triangle -->
        <template v-else-if="variant === 'warning'">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
        </template>

        <!-- Info: info circle -->
        <template v-else-if="variant === 'info'">
          <circle cx="12" cy="12" r="10" />
          <path stroke-linecap="round" d="M12 16v-4M12 8h.01" />
        </template>

        <!-- Success: check circle -->
        <template v-else>
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </template>
      </svg>

      <!-- Content -->
      <div class="flex-1 leading-relaxed">
        <slot />
      </div>

      <!-- Dismiss button -->
      <button
        v-if="dismissible"
        type="button"
        class="mt-0.5 flex-shrink-0 rounded-md p-0.5 opacity-60 transition-opacity hover:opacity-100 focus:outline-none focus-visible:ring-1 focus-visible:ring-current"
        @click="dismissed = true"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </Transition>
</template>
