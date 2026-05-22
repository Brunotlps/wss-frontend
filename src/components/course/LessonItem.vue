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
    class="flex w-full items-start gap-3 px-4 py-3 text-left transition-colors"
    :class="isActive
      ? 'bg-dm-gold/10 text-dm-navy-900 dark:bg-dm-gold/10 dark:text-white'
      : 'text-slate-600 hover:bg-slate-50 hover:text-dm-navy-900 dark:text-dm-navy-200 dark:hover:bg-white/5 dark:hover:text-white'"
    @click="$emit('select', lesson)"
  >
    <!-- Indicador -->
    <span
      class="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full text-xs font-medium"
      :class="
        isCompleted
          ? 'bg-dm-gold text-dm-navy-900'
          : isActive
            ? 'border border-dm-gold text-dm-gold'
            : 'border border-slate-300 text-slate-400 dark:border-dm-navy-600 dark:text-dm-navy-200'
      "
    >
      <svg
        v-if="isCompleted"
        xmlns="http://www.w3.org/2000/svg"
        class="h-3 w-3"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
      </svg>
      <span v-else>{{ lesson.order }}</span>
    </span>

    <div class="min-w-0 flex-1">
      <p class="truncate text-sm font-medium leading-snug">{{ lesson.title }}</p>
      <p class="mt-0.5 text-xs"
        :class="isActive ? 'text-dm-gold/70' : 'text-slate-400 dark:text-dm-navy-200/60'">
        {{ lesson.duration_formatted }}
      </p>
    </div>
  </button>
</template>
