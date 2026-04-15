import api from './api.js'

export const progressService = {
  getProgress(enrollmentId, lessonId) {
    return api.get('/api/progress/', { params: { enrollment: enrollmentId, lesson: lessonId } })
  },

  createProgress(data) {
    return api.post('/api/progress/', data)
  },

  updateProgress(id, data) {
    return api.patch(`/api/progress/${id}/`, data)
  },
}
