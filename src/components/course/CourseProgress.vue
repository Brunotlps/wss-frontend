<script setup>
defineProps({
  percentage: { type: Number, required: true },
})
</script>

<template>
  <div>
    <div class="mb-1 flex justify-between text-xs text-gray-500">
      <span>Progresso</span>
      <span>{{ Math.round(percentage) }}%</span>
    </div>
    <div class="h-1.5 w-full rounded-full bg-gray-200">
      <div
        class="h-1.5 rounded-full bg-gray-900 transition-all duration-300"
        :style="{ width: `${Math.min(percentage, 100)}%` }"
      />
    </div>
  </div>
</template>
