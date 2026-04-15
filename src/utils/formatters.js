export function formatCurrency(value) {
  if (value == null) return '—'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

// Converte centavos (ex: 19900) para string formatada (ex: R$ 199,00)
export function formatCents(cents) {
  return formatCurrency(cents / 100)
}

export function formatDuration(totalMinutes) {
  if (!totalMinutes) return null
  const h = Math.floor(totalMinutes / 60)
  const m = totalMinutes % 60
  if (h === 0) return `${m}min`
  return m === 0 ? `${h}h` : `${h}h ${m}min`
}
