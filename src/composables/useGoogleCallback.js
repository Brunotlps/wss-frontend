import { authService } from '@/services/authService.js'
import { ACCESS_KEY, REFRESH_KEY } from '@/services/api.js'

// Lê o fragment da URL (#a=b&c=d) como query string.
function parseHash() {
  const hash = window.location.hash
  const raw = hash.startsWith('#') ? hash.slice(1) : hash
  return new URLSearchParams(raw)
}

/**
 * Processa o retorno do login Google na rota /auth/callback.
 *
 * O backend (Passo 2) redireciona com `#code=<single-use>`, que é trocado por
 * tokens via POST /api/auth/google/exchange/. O código expira em 60s, então a
 * troca é feita imediatamente ao cair na rota.
 *
 * Dependências injetadas para facilitar teste (sem montar Pinia/router reais).
 */
export async function handleGoogleCallback({ auth, toast, router }) {
  const params = parseHash()

  // Remove código/tokens da barra de endereço e do histórico imediatamente.
  const clearHash = () => window.history.replaceState(null, '', window.location.pathname)
  clearHash()

  try {
    const code = params.get('code')
    if (!code) throw new Error('missing_code')

    const { data } = await authService.googleExchange(code)
    const { access, refresh } = data

    if (!access || !refresh) throw new Error('missing_tokens')

    localStorage.setItem(ACCESS_KEY, access)
    localStorage.setItem(REFRESH_KEY, refresh)

    await auth.initializeAuth()

    toast.success('Bem-vindo!')
    router.replace({ name: 'dashboard' })
  } catch {
    // Falha no exchange (400/expirado/rede) ou hash sem code.
    toast.error('Falha ao autenticar com Google. Tente novamente.')
    router.replace({ name: 'login' })
  }
}
