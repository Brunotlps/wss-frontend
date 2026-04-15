<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { enrollmentService } from '@/services/enrollmentService.js'
import { parseDRFError } from '@/utils/errors.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import CourseProgress from '@/components/course/CourseProgress.vue'

const router = useRouter()

const enrollments = ref([])
const loading = ref(true)
const error = ref('')

const DIFFICULTY_LABELS = { BEG: 'Iniciante', INT: 'Intermediário', ADV: 'Avançado' }

onMounted(async () => {
  try {
    const { data } = await enrollmentService.getEnrollments()
    enrollments.value = Array.isArray(data) ? data : (data.results ?? [])
  } catch (err) {
    error.value = parseDRFError(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <PageWrapper>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 dark:text-chalk-100">Meus Cursos</h1>
      <p class="mt-1 text-sm text-gray-500 dark:text-chalk-400">Continue de onde parou</p>
    </div>

    <!-- Skeletons -->
    <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 3" :key="n" class="animate-pulse rounded-xl border border-gray-200 bg-white p-4 dark:border-chalk-700 dark:bg-chalk-800">
        <div class="mb-3 h-36 rounded-lg bg-gray-200 dark:bg-chalk-700" />
        <div class="mb-2 h-4 w-3/4 rounded bg-gray-200 dark:bg-chalk-700" />
        <div class="mb-4 h-3 w-1/2 rounded bg-gray-200 dark:bg-chalk-700" />
        <div class="h-2 rounded-full bg-gray-200 dark:bg-chalk-700" />
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-gray-500 dark:text-chalk-400">{{ error }}</p>
      <AppButton variant="secondary" @click="router.go(0)">Tentar novamente</AppButton>
    </div>

    <!-- Estado vazio -->
    <div v-else-if="enrollments.length === 0" class="flex flex-col items-center gap-4 py-20 text-center">
      <div class="rounded-full bg-gray-100 p-6 dark:bg-chalk-700">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400 dark:text-chalk-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      </div>
      <div>
        <p class="text-lg font-medium text-gray-800 dark:text-chalk-100">Você ainda não tem cursos</p>
        <p class="mt-1 text-sm text-gray-500 dark:text-chalk-400">Explore o catálogo e comece a aprender</p>
      </div>
      <AppButton @click="router.push({ name: 'course-list' })">Ver catálogo</AppButton>
    </div>

    <!-- Grid de matrículas -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="enrollment in enrollments"
        :key="enrollment.id"
        class="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md dark:border-chalk-700 dark:bg-chalk-800"
      >
        <!-- Thumbnail -->
        <div class="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-chalk-700">
          <img
            v-if="enrollment.course.thumbnail"
            :src="enrollment.course.thumbnail"
            :alt="enrollment.course.title"
            class="h-full w-full object-cover"
          />
          <div v-else class="flex h-full items-center justify-center text-gray-300 dark:text-chalk-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.893L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
            </svg>
          </div>
        </div>

        <!-- Conteúdo -->
        <div class="flex flex-1 flex-col gap-3 p-4">
          <div class="flex-1">
            <div class="flex items-start justify-between gap-2">
              <h3 class="font-semibold leading-snug text-gray-900 line-clamp-2 dark:text-chalk-100">
                {{ enrollment.course.title }}
              </h3>
              <span
                v-if="enrollment.completed"
                class="flex-shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-400"
              >
                Concluído
              </span>
            </div>
            <p v-if="enrollment.course.instructor_name" class="mt-1 text-sm text-gray-500 dark:text-chalk-400">
              {{ enrollment.course.instructor_name }}
            </p>
            <p v-if="enrollment.course.difficulty" class="mt-0.5 text-xs text-gray-400 dark:text-chalk-500">
              {{ DIFFICULTY_LABELS[enrollment.course.difficulty] ?? enrollment.course.difficulty }}
            </p>
          </div>

          <CourseProgress :percentage="enrollment.progress_percentage" />

          <AppButton
            full
            :variant="enrollment.completed ? 'secondary' : 'primary'"
            @click="router.push({ name: 'player', params: { enrollmentId: enrollment.id } })"
          >
            {{ enrollment.completed ? 'Rever curso' : 'Continuar' }}
          </AppButton>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>
