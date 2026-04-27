<script setup>
defineProps({
  lesson: { type: Object, required: true },
  isActive: { type: Boolean, default: false },
  isCompleted: { type: Boolean, default: false },
})

defineEmits(['select'])
</script>

<template>
  <button
    class="flex w-full items-start gap-3 rounded-lg px-4 py-3 text-left transition-colors"
    :class="isActive ? 'bg-gold-500/10 text-navy-900 dark:bg-gold-500/10 dark:text-gold-400' : 'text-gray-600 hover:bg-cream-100 hover:text-gray-900 dark:text-navy-300 dark:hover:bg-white/5 dark:hover:text-navy-100'"
    @click="$emit('select', lesson)"
  >
    <!-- Indicador: número ou check -->
    <span
      class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium"
      :class="
        isCompleted
          ? 'bg-gold-500 text-navy-900'
          : isActive
            ? 'border border-gold-500 text-gold-600 dark:border-gold-400 dark:text-gold-400'
            : 'border border-gray-400 text-gray-400 dark:border-navy-500 dark:text-navy-400'
      "
    >
      <svg
        v-if="isCompleted"
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
          clip-rule="evenodd"
        />
      </svg>
      <span v-else>{{ lesson.order }}</span>
    </span>

    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium leading-snug">{{ lesson.title }}</p>
      <p class="mt-0.5 text-xs" :class="isActive ? 'text-gold-600 dark:text-gold-500' : 'text-gray-400 dark:text-navy-400'">
        {{ lesson.duration_formatted }}
      </p>
    </div>
  </button>
</template>
