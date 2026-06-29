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
 * Suporta dois formatos no hash da URL:
 *  - novo  (Passo 2): `#code=<single-use>` → troca via POST /api/auth/google/exchange/
 *  - legado (Passo 1): `#access=<jwt>&refresh=<jwt>` → usa os tokens direto
 *
 * O branch legado só deve ser removido depois que o backend Passo 2 (callback
 * emitindo `#code=`) estiver em produção e validado.
 *
 * Dependências injetadas para facilitar teste (sem montar Pinia/router reais).
 */
export async function handleGoogleCallback({ auth, toast, router }) {
  const params = parseHash()

  // Remove código/tokens da barra de endereço e do histórico imediatamente.
  const clearHash = () => window.history.replaceState(null, '', window.location.pathname)
  clearHash()

  try {
    let access
    let refresh

    const code = params.get('code')

    if (code) {
      // Fluxo novo: o código é single-use e expira em 60s — troca na hora.
      const { data } = await authService.googleExchange(code)
      access = data.access
      refresh = data.refresh
    } else if (params.get('access') && params.get('refresh')) {
      // Fluxo legado (ainda emitido pelo backend hoje).
      access = params.get('access')
      refresh = params.get('refresh')
    } else {
      throw new Error('missing_tokens')
    }

    if (!access || !refresh) throw new Error('missing_tokens')

    localStorage.setItem(ACCESS_KEY, access)
    localStorage.setItem(REFRESH_KEY, refresh)

    await auth.initializeAuth()

    toast.success('Bem-vindo!')
    router.replace({ name: 'dashboard' })
  } catch {
    // Falha no exchange (400/expirado/rede) ou hash sem code/tokens.
    toast.error('Falha ao autenticar com Google. Tente novamente.')
    router.replace({ name: 'login' })
  }
}
