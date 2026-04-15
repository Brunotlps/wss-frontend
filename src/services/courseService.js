import api from './api.js'

export const courseService = {
  listCourses() {
    return api.get('/api/courses/')
  },

  getCourse(id) {
    return api.get(`/api/courses/${id}/`)
  },
}
