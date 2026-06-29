import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { authService } from '@/services/authService.js'
import { ACCESS_KEY } from '@/services/api.js'

// Mantém o axios.create real (usado por api.js) e apenas espiona axios.post.
vi.mock('axios', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    default: {
      ...actual.default,
      post: vi.fn(),
    },
  }
})

describe('authService.googleExchange', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('usa axios cru com a URL/payload corretos e NÃO envia Authorization, mesmo com token na sessão', async () => {
    // Simula um access token antigo/expirado já presente no localStorage.
    localStorage.setItem(ACCESS_KEY, 'stale_token')
    axios.post.mockResolvedValue({ data: { access: 'A', refresh: 'R' } })

    await authService.googleExchange('the_code')

    expect(axios.post).toHaveBeenCalledTimes(1)
    const [url, body, config] = axios.post.mock.calls[0]
    expect(url).toMatch(/\/api\/auth\/google\/exchange\/$/)
    expect(body).toEqual({ code: 'the_code' })
    // Endpoint público: o Bearer da sessão não pode vazar na chamada.
    expect(config?.headers?.Authorization).toBeUndefined()
  })
})
