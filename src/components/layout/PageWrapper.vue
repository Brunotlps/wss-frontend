<script setup>
defineProps({
  full: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <main v-if="full">
    <slot />
  </main>
  <main v-else class="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
    <slot />
  </main>
</template>
