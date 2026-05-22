import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '@/services/authService.js'
import { profileService } from '@/services/profileService.js'
import { ACCESS_KEY, REFRESH_KEY } from '@/services/api.js'
import { DEFAULT_PROFILE } from '@/utils/avatarOptions.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(null)
  const profile = ref({ ...DEFAULT_PROFILE })

  const isAuthenticated = computed(() => !!accessToken.value)

  // Reidrata o store a partir do localStorage e busca dados do usuário
  async function initializeAuth() {
    const token = localStorage.getItem(ACCESS_KEY)
    if (!token) return
    accessToken.value = token
    try {
      const { data } = await authService.getMe()
      user.value = data
      profile.value = profileService.get(data.id)
    } catch {
      // Token inválido ou expirado — o interceptor de refresh cuidará disso
    }
  }

  async function login(credentials) {
    const { data } = await authService.login(credentials)
    accessToken.value = data.access
    localStorage.setItem(ACCESS_KEY, data.access)
    localStorage.setItem(REFRESH_KEY, data.refresh)
    // Busca dados do usuário após login
    const me = await authService.getMe()
    user.value = me.data
    profile.value = profileService.get(me.data.id)
  }

  async function register(userData) {
    await authService.register(userData)
  }

  async function logout() {
    try {
      const refresh = localStorage.getItem(REFRESH_KEY)
      if (refresh) await authService.logout(refresh)
    } catch {
      // Ignora erros no blacklist — prossegue com o logout local
    } finally {
      user.value = null
      accessToken.value = null
      profile.value = { ...DEFAULT_PROFILE }
      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(REFRESH_KEY)
    }
  }

  function updateProfile(next) {
    if (!user.value?.id) return
    profileService.set(user.value.id, next)
    profile.value = { icon: next.icon, color: next.color }
  }

  return {
    user,
    accessToken,
    profile,
    isAuthenticated,
    initializeAuth,
    login,
    register,
    logout,
    updateProfile,
  }
})
