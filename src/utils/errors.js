/**
 * Extrai uma mensagem legível de um erro de resposta DRF.
 * Formatos tratados:
 *   { "detail": "..." }
 *   { "non_field_errors": ["..."] }
 *   { "field": ["erro1", "erro2"] }
 */
export function parseDRFError(error) {
  const data = error.response?.data

  if (!data) return 'Erro de conexão. Verifique sua internet e tente novamente.'

  if (typeof data.detail === 'string') return data.detail

  if (Array.isArray(data.non_field_errors)) return data.non_field_errors[0]

  const messages = Object.values(data)
    .flat()
    .filter((v) => typeof v === 'string')

  if (messages.length) return messages[0]

  return 'Ocorreu um erro inesperado. Tente novamente.'
}

/**
 * Mapeia erros de campo DRF para o formato do VeeValidate setErrors().
 * Retorna apenas os campos conhecidos; erros globais ficam em parseDRFError.
 */
export function extractFieldErrors(error, knownFields) {
  const data = error.response?.data
  if (!data) return {}

  return knownFields.reduce((acc, field) => {
    if (data[field]) acc[field] = Array.isArray(data[field]) ? data[field][0] : data[field]
    return acc
  }, {})
}
