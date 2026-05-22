import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal(containerRef, options = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -40px 0px' } = options

  let observer = null

  onMounted(() => {
    const root = containerRef?.value ?? document
    const elements = root.querySelectorAll('.reveal')

    if (!elements.length) return

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold, rootMargin },
    )

    elements.forEach((el) => observer.observe(el))
  })

  onUnmounted(() => {
    observer?.disconnect()
  })
}
