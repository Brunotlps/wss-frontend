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
    <label v-if="label" :for="id" class="text-sm font-medium text-dm-navy-200">
      {{ label }}
    </label>
    <input
      :id="id"
      v-model="model"
      :type="type"
      :placeholder="placeholder"
      :autocomplete="autocomplete"
      :class="[
        'rounded-lg border px-3 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-dm-navy-800',
        'bg-dm-navy-700 text-white placeholder-dm-navy-200',
        error
          ? 'border-red-500 focus:ring-red-500'
          : 'border-dm-navy-600 focus:border-dm-gold focus:ring-dm-gold',
      ]"
    />
    <p v-if="error" class="text-xs text-red-400">{{ error }}</p>
  </div>
</template>
