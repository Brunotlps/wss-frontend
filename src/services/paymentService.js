import api from './api.js'

export const paymentService = {
  createPaymentIntent(courseId) {
    return api.post('/api/payments/create-intent/', { course_id: courseId })
  },
}
