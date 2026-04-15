import { ref } from 'vue'
import { defineStore } from 'pinia'
import { courseService } from '@/services/courseService.js'

export const useCoursesStore = defineStore('courses', () => {
  const courses = ref([])
  const currentCourse = ref(null)
  const loading = ref(false)
  const error = ref(null)

  async function fetchCourses() {
    loading.value = true
    error.value = null
    try {
      const { data } = await courseService.listCourses()
      // Suporta tanto lista plana quanto paginação DRF { results: [] }
      courses.value = Array.isArray(data) ? data : (data.results ?? [])
    } catch (e) {
      error.value = 'Não foi possível carregar os cursos.'
    } finally {
      loading.value = false
    }
  }

  async function fetchCourse(id) {
    loading.value = true
    error.value = null
    currentCourse.value = null
    try {
      const { data } = await courseService.getCourse(id)
      currentCourse.value = data
    } catch (e) {
      error.value = 'Não foi possível carregar o curso.'
    } finally {
      loading.value = false
    }
  }

  return { courses, currentCourse, loading, error, fetchCourses, fetchCourse }
})
