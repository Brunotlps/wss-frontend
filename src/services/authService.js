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

  logout(refresh) {
    return api.post('/api/auth/token/blacklist/', { refresh })
  },

  getMe() {
    return api.get('/api/users/me/')
  },
}
