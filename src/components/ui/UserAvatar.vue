<script setup>
import { computed } from 'vue'
import { getColor, getIcon, DEFAULT_PROFILE } from '@/utils/avatarOptions.js'

const props = defineProps({
  icon: { type: String, default: DEFAULT_PROFILE.icon },
  color: { type: String, default: DEFAULT_PROFILE.color },
  size: {
    type: String,
    default: 'md',
    validator: (v) => ['sm', 'md', 'lg', 'xl'].includes(v),
  },
})

const colorDef = computed(() => getColor(props.color))
const iconDef = computed(() => getIcon(props.icon))

const SIZE = {
  sm: { box: 'h-8 w-8',   icon: 'h-4 w-4' },
  md: { box: 'h-10 w-10', icon: 'h-5 w-5' },
  lg: { box: 'h-14 w-14', icon: 'h-7 w-7' },
  xl: { box: 'h-20 w-20', icon: 'h-10 w-10' },
}
</script>

<template>
  <div
    class="flex flex-shrink-0 items-center justify-center rounded-full"
    :class="[SIZE[size].box, colorDef.bg, colorDef.text]"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :class="SIZE[size].icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      :aria-label="iconDef.label"
    >
      <!-- Avião -->
      <path
        v-if="icon === 'plane'"
        d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"
      />

      <!-- Globo -->
      <template v-else-if="icon === 'globe'">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </template>

      <!-- Mala -->
      <template v-else-if="icon === 'luggage'">
        <rect x="6" y="8" width="12" height="13" rx="2" />
        <path d="M10 8V6a2 2 0 0 1 4 0v2" />
        <path d="M10 12v6" />
        <path d="M14 12v6" />
      </template>

      <!-- Estrela -->
      <path
        v-else-if="icon === 'star'"
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
      />

      <!-- Foguete -->
      <template v-else-if="icon === 'rocket'">
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
      </template>

      <!-- Graduação -->
      <template v-else-if="icon === 'graduation'">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c3 3 9 3 12 0v-5" />
      </template>

      <!-- Maleta -->
      <template v-else-if="icon === 'briefcase'">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </template>

      <!-- Chave -->
      <path
        v-else-if="icon === 'key'"
        d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"
      />
    </svg>
  </div>
</template>
