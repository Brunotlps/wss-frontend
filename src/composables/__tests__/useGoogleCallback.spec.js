import { describe, it, expect, beforeEach, vi } from 'vitest'
import { handleGoogleCallback } from '@/composables/useGoogleCallback.js'
import { authService } from '@/services/authService.js'
import { ACCESS_KEY, REFRESH_KEY } from '@/services/api.js'

vi.mock('@/services/authService.js', () => ({
  authService: { googleExchange: vi.fn() },
}))

function makeDeps() {
  return {
    auth: { initializeAuth: vi.fn().mockResolvedValue(undefined) },
    toast: { success: vi.fn(), error: vi.fn() },
    router: { replace: vi.fn() },
  }
}

function setHash(hash) {
  window.location.hash = hash
}

describe('handleGoogleCallback', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    // Reset URL para a rota de callback sem hash.
    window.history.replaceState(null, '', '/auth/callback')
  })

  it('novo fluxo: troca o code por tokens, salva, limpa o hash e redireciona pra área logada', async () => {
    setHash('#code=abc')
    authService.googleExchange.mockResolvedValue({ data: { access: 'A_JWT', refresh: 'R_JWT' } })
    const deps = makeDeps()

    await handleGoogleCallback(deps)

    expect(authService.googleExchange).toHaveBeenCalledWith('abc')
    expect(localStorage.getItem(ACCESS_KEY)).toBe('A_JWT')
    expect(localStorage.getItem(REFRESH_KEY)).toBe('R_JWT')
    expect(window.location.hash).toBe('')
    expect(deps.auth.initializeAuth).toHaveBeenCalled()
    expect(deps.router.replace).toHaveBeenCalledWith({ name: 'dashboard' })
    expect(deps.toast.error).not.toHaveBeenCalled()
  })

  it('novo fluxo com exchange 400: redireciona pro erro e não salva nenhum token', async () => {
    setHash('#code=abc')
    authService.googleExchange.mockRejectedValue(
      Object.assign(new Error('Request failed'), { response: { status: 400 } }),
    )
    const deps = makeDeps()

    await handleGoogleCallback(deps)

    expect(authService.googleExchange).toHaveBeenCalledWith('abc')
    expect(localStorage.getItem(ACCESS_KEY)).toBeNull()
    expect(localStorage.getItem(REFRESH_KEY)).toBeNull()
    expect(window.location.hash).toBe('')
    expect(deps.router.replace).toHaveBeenCalledWith({ name: 'login' })
    expect(deps.toast.error).toHaveBeenCalled()
  })

  it('hash vazio (sem code): redireciona pro erro sem chamar exchange nem salvar tokens', async () => {
    setHash('')
    const deps = makeDeps()

    await handleGoogleCallback(deps)

    expect(authService.googleExchange).not.toHaveBeenCalled()
    expect(localStorage.getItem(ACCESS_KEY)).toBeNull()
    expect(deps.router.replace).toHaveBeenCalledWith({ name: 'login' })
    expect(deps.toast.error).toHaveBeenCalled()
  })
})
