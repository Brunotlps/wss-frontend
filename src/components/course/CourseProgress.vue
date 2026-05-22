<script setup>
defineProps({
  percentage: { type: Number, required: true },
})
</script>

<template>
  <div>
    <div class="mb-1.5 flex justify-between text-xs text-dm-navy-200">
      <span>Progresso</span>
      <span class="font-medium text-dm-gold">{{ Math.round(percentage) }}%</span>
    </div>
    <div class="h-1.5 w-full rounded-full bg-dm-navy-700">
      <div
        class="h-1.5 rounded-full bg-dm-gold transition-all duration-300"
        :style="{ width: `${Math.min(percentage, 100)}%` }"
      />
    </div>
  </div>
</template>
