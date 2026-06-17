import api from './api.js'

export const videoService = {
  // Retorna a URL assinada de curta duração para tocar o vídeo protegido.
  // Backend valida matrícula (IsEnrolled) e devolve { url } com sig+exp embutidos.
  // A URL resultante NÃO exige header — vai direto no <video :src> (seek nativo).
  getStreamUrl(videoId) {
    return api.get(`/api/videos/${videoId}/stream-url/`)
  },
}
