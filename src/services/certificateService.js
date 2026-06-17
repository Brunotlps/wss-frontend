import api from './api.js'

export const certificateService = {
  getCertificates() {
    return api.get('/api/certificates/')
  },

  // Baixa o PDF do certificado autenticado (Bearer via interceptor) como blob.
  // download_url é absoluta e exige Authorization — não funciona em <a href>.
  downloadCertificate(downloadUrl) {
    return api.get(downloadUrl, { responseType: 'blob' })
  },
}
