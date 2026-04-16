import api from './api.js'

export const enrollmentService = {
  getEnrollments() {
    return api.get('/api/enrollments/')
  },

  getEnrollment(id) {
    return api.get(`/api/enrollments/${id}/`)
  },

  createEnrollment(courseId) {
    return api.post('/api/enrollments/', { course_id: courseId })
  },
}
