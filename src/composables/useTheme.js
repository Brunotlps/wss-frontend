// Dark-only — the brand is always navy/gold
document.documentElement.classList.add('dark')

export function useTheme() {
  return {
    isDark: { value: true },
    toggle: () => {},
  }
}
