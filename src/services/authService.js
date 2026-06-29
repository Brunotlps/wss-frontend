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

  // Troca o código single-use do callback Google por tokens JWT (endpoint público)
  googleExchange(code) {
    return api.post('/api/auth/google/exchange/', { code })
  },

  logout(refresh) {
    return api.post('/api/auth/token/blacklist/', { refresh })
  },

  getMe() {
    return api.get('/api/users/me/')
  },
}
