import api from './api.js'

export const lessonService = {
  getLessons(courseId) {
    return api.get('/api/lessons/', { params: { course: courseId } })
  },

  getLesson(id) {
    return api.get(`/api/lessons/${id}/`)
  },
}
