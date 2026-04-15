<script setup>
defineProps({
  percentage: { type: Number, required: true },
})
</script>

<template>
  <div>
    <div class="mb-1 flex justify-between text-xs text-gray-500 dark:text-chalk-400">
      <span>Progresso</span>
      <span>{{ Math.round(percentage) }}%</span>
    </div>
    <div class="h-1.5 w-full rounded-full bg-gray-200 dark:bg-chalk-600">
      <div
        class="h-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
        :style="{ width: `${Math.min(percentage, 100)}%` }"
      />
    </div>
  </div>
</template>
