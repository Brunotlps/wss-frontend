import api from './api.js'

export const authService = {
  login(credentials) {
    return api.post('/api/auth/login/', credentials)
  },

  register(data) {
    return api.post('/api/auth/register/', data)
  },

  refreshToken(refresh) {
    return api.post('/api/auth/token/refresh/', { refresh })
  },
}
