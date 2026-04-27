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
  <div class="flex flex-col gap-1">
    <label v-if="label" :for="id" class="text-sm font-medium text-gray-700 dark:text-navy-200">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="[
        'rounded-md border px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1',
        'bg-white text-gray-900 placeholder-gray-400',
        'dark:bg-navy-800 dark:text-cream-50 dark:placeholder-navy-400',
        error
          ? 'border-red-400 focus:ring-red-400 dark:border-red-500'
          : 'border-cream-200 focus:border-gold-500 focus:ring-gold-500 dark:border-navy-600 dark:focus:border-gold-500',
      ]"
    />
    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>
