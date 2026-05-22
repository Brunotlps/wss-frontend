import axios from 'axios'

const ACCESS_KEY = 'wss_access_token'
const REFRESH_KEY = 'wss_refresh_token'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

// — Request: injeta Bearer token em toda requisição autenticada
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(ACCESS_KEY)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// — Refresh lock: evita múltiplas chamadas simultâneas de refresh
let isRefreshing = false
let pendingQueue = [] // [{ resolve, reject }]

function processQueue(error, token = null) {
  pendingQueue.forEach(({ resolve, reject }) => {
    if (error) reject(error)
    else resolve(token)
  })
  pendingQueue = []
}

// — Response: trata 401 — tenta renovar o token e reenviar a request original
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config

    const is401 = error.response?.status === 401
    const isAuthEndpoint = original.url?.includes('/api/auth/')
    const alreadyRetried = original._retry

    if (!is401 || isAuthEndpoint || alreadyRetried) {
      return Promise.reject(error)
    }

    original._retry = true

    if (isRefreshing) {
      // Outra request já está renovando — enfileira e aguarda
      return new Promise((resolve, reject) => {
        pendingQueue.push({ resolve, reject })
      })
        .then((token) => {
          original.headers.Authorization = `Bearer ${token}`
          return api(original)
        })
        .catch((err) => Promise.reject(err))
    }

    isRefreshing = true

    try {
      const refresh = localStorage.getItem(REFRESH_KEY)
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/token/refresh/`,
        { refresh },
      )
      const newToken = data.access
      localStorage.setItem(ACCESS_KEY, newToken)
      api.defaults.headers.common.Authorization = `Bearer ${newToken}`
      processQueue(null, newToken)
      original.headers.Authorization = `Bearer ${newToken}`
      return api(original)
    } catch (refreshError) {
      processQueue(refreshError, null)
      // Refresh inválido — limpa sessão e força novo login
      localStorage.removeItem(ACCESS_KEY)
      localStorage.removeItem(REFRESH_KEY)
      window.location.href = '/login'
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  },
)

export default api
export { ACCESS_KEY, REFRESH_KEY }
