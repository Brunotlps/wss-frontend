import { toast as sonner } from 'vue-sonner'
import { useTheme } from './useTheme.js'

const base = {
  borderRadius: '1rem',
  fontFamily: "'Poppins', ui-sans-serif, system-ui, sans-serif",
  fontWeight: '600',
  fontSize: '14px',
  letterSpacing: '0.01em',
}

const light = {
  ...base,
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  color: '#1e293b',
  boxShadow: '0 8px 24px -4px rgba(6, 6, 66, 0.1)',
}

const dark = {
  ...base,
  background: 'rgba(6, 6, 66, 0.92)',
  border: '1px solid rgba(255, 217, 66, 0.25)',
  color: '#ffffff',
  backdropFilter: 'blur(12px)',
  boxShadow: '0 8px 32px -4px rgba(255, 217, 66, 0.08)',
}

function getStyle() {
  const { isDark } = useTheme()
  return isDark.value ? dark : light
}

export function useToast() {
  return {
    success: (msg, opts = {}) =>
      sonner.success(msg, { ...opts, style: { ...getStyle(), ...opts.style } }),
    error: (msg, opts = {}) =>
      sonner.error(msg, { ...opts, style: { ...getStyle(), ...opts.style } }),
    info: (msg, opts = {}) =>
      sonner.info(msg, { ...opts, style: { ...getStyle(), ...opts.style } }),
    warning: (msg, opts = {}) =>
      sonner.warning(msg, { ...opts, style: { ...getStyle(), ...opts.style } }),
  }
}
