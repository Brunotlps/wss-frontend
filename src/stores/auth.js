import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { authService } from '@/services/authService.js'
import { ACCESS_KEY, REFRESH_KEY } from '@/services/api.js'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const accessToken = ref(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  // Reidrata o store a partir do localStorage (chamado no App.vue mounted)
  function initializeAuth() {
    const token = localStorage.getItem(ACCESS_KEY)
    if (token) {
      accessToken.value = token
    }
  }

  async function login(credentials) {
    const { data } = await authService.login(credentials)
    accessToken.value = data.access
    localStorage.setItem(ACCESS_KEY, data.access)
    localStorage.setItem(REFRESH_KEY, data.refresh)
  }

  async function register(userData) {
    await authService.register(userData)
  }

  function logout() {
    user.value = null
    accessToken.value = null
    localStorage.removeItem(ACCESS_KEY)
    localStorage.removeItem(REFRESH_KEY)
  }

  return {
    user,
    accessToken,
    isAuthenticated,
    initializeAuth,
    login,
    register,
    logout,
  }
})
