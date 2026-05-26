import { toast as sonner } from 'vue-sonner'
import { useTheme } from './useTheme.js'

const light = {
  success: {
    background: '#ecfdf5',
    border: '1px solid #a7f3d0',
    color: '#065f46',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px -4px rgba(6, 95, 70, 0.12)',
  },
  error: {
    background: '#fef2f2',
    border: '1px solid #fecaca',
    color: '#991b1b',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px -4px rgba(153, 27, 27, 0.12)',
  },
  info: {
    background: '#eff6ff',
    border: '1px solid #bfdbfe',
    color: '#1e40af',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px -4px rgba(30, 64, 175, 0.12)',
  },
  warning: {
    background: '#fffbeb',
    border: '1px solid #fde68a',
    color: '#92400e',
    borderRadius: '1rem',
    boxShadow: '0 8px 24px -4px rgba(146, 64, 14, 0.12)',
  },
}

const dark = {
  success: {
    background: 'rgba(6, 78, 59, 0.9)',
    border: '1px solid rgba(16, 185, 129, 0.4)',
    color: '#a7f3d0',
    borderRadius: '1rem',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px -4px rgba(6, 78, 59, 0.4)',
  },
  error: {
    background: 'rgba(127, 29, 29, 0.9)',
    border: '1px solid rgba(239, 68, 68, 0.4)',
    color: '#fecaca',
    borderRadius: '1rem',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px -4px rgba(127, 29, 29, 0.4)',
  },
  info: {
    background: 'rgba(9, 9, 94, 0.92)',
    border: '1px solid rgba(37, 84, 214, 0.4)',
    color: '#c4c4f4',
    borderRadius: '1rem',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px -4px rgba(3, 57, 191, 0.3)',
  },
  warning: {
    background: 'rgba(120, 83, 9, 0.9)',
    border: '1px solid rgba(255, 217, 66, 0.4)',
    color: '#fef3c7',
    borderRadius: '1rem',
    backdropFilter: 'blur(12px)',
    boxShadow: '0 8px 32px -4px rgba(120, 83, 9, 0.4)',
  },
}

function getStyle(type) {
  const { isDark } = useTheme()
  return isDark.value ? dark[type] : light[type]
}

export function useToast() {
  return {
    success: (msg, opts = {}) =>
      sonner.success(msg, { ...opts, style: { ...getStyle('success'), ...opts.style } }),
    error: (msg, opts = {}) =>
      sonner.error(msg, { ...opts, style: { ...getStyle('error'), ...opts.style } }),
    info: (msg, opts = {}) =>
      sonner.info(msg, { ...opts, style: { ...getStyle('info'), ...opts.style } }),
    warning: (msg, opts = {}) =>
      sonner.warning(msg, { ...opts, style: { ...getStyle('warning'), ...opts.style } }),
  }
}
