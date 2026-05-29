import { ref } from 'vue'
import { defineStore } from 'pinia'
import { enrollmentService } from '@/services/enrollmentService.js'

export const useEnrollmentStore = defineStore('enrollment', () => {
  const enrollments = ref([])
  const loading = ref(false)
  const error = ref(null)

  async function fetchEnrollments() {
    loading.value = true
    error.value = null
    try {
      const { data } = await enrollmentService.getEnrollments()
      enrollments.value = Array.isArray(data) ? data : (data.results ?? [])
    } catch {
      error.value = 'Não foi possível carregar as matrículas.'
    } finally {
      loading.value = false
    }
  }

  function getEnrollmentByCourseId(courseId) {
    return enrollments.value.find((e) => e.course?.id === Number(courseId)) ?? null
  }

  return { enrollments, loading, error, fetchEnrollments, getEnrollmentByCourseId }
})
