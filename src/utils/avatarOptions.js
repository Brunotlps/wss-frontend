// Catálogo de ícones e cores para o avatar do aluno.
// Mantém apenas metadados — o SVG dos ícones vive em UserAvatar.vue.
// Todas as classes Tailwind aqui são literais (string completa) para que
// o JIT consiga detectá-las ao escanear este arquivo.

export const AVATAR_ICONS = [
  { id: 'plane', label: 'Avião' },
  { id: 'globe', label: 'Globo' },
  { id: 'luggage', label: 'Mala' },
  { id: 'star', label: 'Estrela' },
  { id: 'rocket', label: 'Foguete' },
  { id: 'graduation', label: 'Graduação' },
  { id: 'briefcase', label: 'Maleta' },
  { id: 'key', label: 'Chave' },
]

export const AVATAR_COLORS = [
  { id: 'gold',    label: 'Dourado',   bg: 'bg-dm-gold',       text: 'text-dm-navy-900' },
  { id: 'blue',    label: 'Azul',      bg: 'bg-dm-blue',       text: 'text-white' },
  { id: 'emerald', label: 'Esmeralda', bg: 'bg-emerald-500',   text: 'text-white' },
  { id: 'amber',   label: 'Âmbar',     bg: 'bg-amber-500',     text: 'text-white' },
  { id: 'rose',    label: 'Rosa',      bg: 'bg-rose-500',      text: 'text-white' },
  { id: 'violet',  label: 'Violeta',   bg: 'bg-violet-500',    text: 'text-white' },
]

export const DEFAULT_PROFILE = { icon: 'plane', color: 'gold' }

export function isValidIcon(id) {
  return AVATAR_ICONS.some((i) => i.id === id)
}

export function isValidColor(id) {
  return AVATAR_COLORS.some((c) => c.id === id)
}

export function getIcon(id) {
  return AVATAR_ICONS.find((i) => i.id === id) ?? AVATAR_ICONS[0]
}

export function getColor(id) {
  return AVATAR_COLORS.find((c) => c.id === id) ?? AVATAR_COLORS[0]
}
