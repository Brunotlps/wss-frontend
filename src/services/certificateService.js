import api from './api.js'

export const certificateService = {
  getCertificates() {
    return api.get('/api/certificates/')
  },
}
