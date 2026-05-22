import { DEFAULT_PROFILE, isValidIcon, isValidColor } from '@/utils/avatarOptions.js'

// Storage por usuário: wss_profile_<userId>
// Abstração intencional — quando o backend ganhar um campo de perfil,
// basta trocar a implementação destes três métodos sem tocar nas views/store.
const key = (userId) => `wss_profile_${userId}`

export const profileService = {
  get(userId) {
    if (!userId) return { ...DEFAULT_PROFILE }
    try {
      const raw = localStorage.getItem(key(userId))
      if (!raw) return { ...DEFAULT_PROFILE }
      const parsed = JSON.parse(raw)
      if (!isValidIcon(parsed?.icon) || !isValidColor(parsed?.color)) {
        return { ...DEFAULT_PROFILE }
      }
      return { icon: parsed.icon, color: parsed.color }
    } catch {
      return { ...DEFAULT_PROFILE }
    }
  },

  set(userId, profile) {
    if (!userId) return
    if (!isValidIcon(profile?.icon) || !isValidColor(profile?.color)) return
    localStorage.setItem(
      key(userId),
      JSON.stringify({ icon: profile.icon, color: profile.color }),
    )
  },

  clear(userId) {
    if (!userId) return
    localStorage.removeItem(key(userId))
  },
}
