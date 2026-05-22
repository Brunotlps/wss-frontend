<script setup>
defineProps({
  label: { type: String, default: '' },
  error: { type: String, default: '' },
  id: { type: String, required: true },
  type: { type: String, default: 'text' },
  placeholder: { type: String, default: '' },
  autocomplete: { type: String, default: 'off' },
})

const model = defineModel()
</script>

<template>
  <div class="flex flex-col gap-1.5">
    <label v-if="label" :for="id" class="text-sm font-medium text-slate-700 dark:text-dm-navy-200">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="[
        'rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1',
        'bg-white text-slate-900 placeholder-slate-400',
        'dark:bg-dm-navy-800 dark:text-white dark:placeholder-dm-navy-200',
        error
          ? 'border-red-400 focus:ring-red-400 dark:border-red-500'
          : 'border-slate-300 focus:border-dm-gold focus:ring-dm-gold/30 dark:border-dm-navy-600 dark:focus:border-dm-gold dark:focus:ring-dm-gold/30',
      ]"
    />
    <p v-if="error" class="text-xs text-red-500 dark:text-red-400">{{ error }}</p>
  </div>
</template>
