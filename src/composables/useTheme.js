import { ref, watch } from 'vue'

const STORAGE_KEY = 'dm-theme'

const isDark = ref(localStorage.getItem(STORAGE_KEY) !== 'light')

watch(
  isDark,
  (dark) => {
    localStorage.setItem(STORAGE_KEY, dark ? 'dark' : 'light')
    if (dark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  },
  { immediate: true },
)

export function useTheme() {
  function toggle() {
    isDark.value = !isDark.value
  }
  return { isDark, toggle }
}
