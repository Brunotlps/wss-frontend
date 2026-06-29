import axios from 'axios'
import api from './api.js'

export const authService = {
  login(credentials) {
    return api.post('/api/auth/token/', credentials)
  },

  register(data) {
    return api.post('/api/auth/register/', data)
  },

  refreshToken(refresh) {
    return api.post('/api/auth/token/refresh/', { refresh })
  },

  // Troca o código single-use do callback Google por tokens JWT.
  // Endpoint público: usa axios "cru" (sem o interceptor de Bearer do `api`),
  // para não anexar um access token antigo/expirado da sessão.
  googleExchange(code) {
    return axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/api/auth/google/exchange/`,
      { code },
      { headers: { 'Content-Type': 'application/json' } },
    )
  },

  logout(refresh) {
    return api.post('/api/auth/token/blacklist/', { refresh })
  },

  getMe() {
    return api.get('/api/users/me/')
  },
}
