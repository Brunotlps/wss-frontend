<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  animation: {
    type: String,
    default: 'up',
    validator: (v) => ['left', 'right', 'up'].includes(v),
  },
  delay: {
    type: Number,
    default: 0,
  },
  tag: {
    type: String,
    default: 'div',
  },
})

const el = ref(null)

onMounted(() => {
  if (!el.value) return

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        el.value.classList.add('is-visible')
        observer.disconnect()
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
  )

  observer.observe(el.value)
})
</script>

<template>
  <component
    :is="tag"
    ref="el"
    class="reveal"
    :class="[`reveal-${animation}`, delay ? `reveal-delay-${delay}` : '']"
  >
    <slot />
  </component>
</template>
