<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCoursesStore } from '@/stores/courses.js'
import { useAuthStore } from '@/stores/auth.js'
import { enrollmentService } from '@/services/enrollmentService.js'
import { formatCurrency, formatDuration } from '@/utils/formatters.js'
import { parseDRFError } from '@/utils/errors.js'
import { toast } from 'vue-sonner'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const store = useCoursesStore()
const auth = useAuthStore()

const DIFFICULTY_LABELS = { BEG: 'Iniciante', INT: 'Intermediário', ADV: 'Avançado' }
const DIFFICULTY_COLORS = {
  BEG: 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400',
  INT: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400',
  ADV: 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-400',
}

const enrolling = ref(false)

const isFree = computed(() => Number(store.currentCourse?.price) === 0)

onMounted(() => {
  store.fetchCourse(route.params.id)
})

function handleBuy() {
  if (auth.isAuthenticated) {
    router.push({ name: 'checkout', params: { courseId: route.params.id } })
  } else {
    router.push({ name: 'login', query: { redirect: `/checkout/${route.params.id}` } })
  }
}

async function handleEnroll() {
  if (!auth.isAuthenticated) {
    router.push({ name: 'login', query: { redirect: `/courses/${route.params.id}` } })
    return
  }
  enrolling.value = true
  try {
    const { data } = await enrollmentService.createEnrollment(Number(route.params.id))
    toast.success('Matrícula realizada!', { description: 'Bom aprendizado. Seu progresso é salvo automaticamente.' })
    router.push({ name: 'player', params: { enrollmentId: data.id } })
  } catch (err) {
    const detail = err.response?.data?.detail ?? ''
    if (err.response?.status === 400 && detail.toLowerCase().includes('matriculado')) {
      toast.info('Você já está matriculado', { description: 'Redirecionando para Meus Cursos.' })
      router.push({ name: 'dashboard' })
    } else {
      toast.error(parseDRFError(err))
    }
  } finally {
    enrolling.value = false
  }
}

function totalLessons(course) {
  if (course.modules?.length) {
    return course.modules.reduce((acc, m) => acc + (m.lessons?.length ?? 0), 0)
  }
  return course.lessons?.length ?? 0
}
</script>

<template>
  <PageWrapper>
    <!-- Skeleton de carregamento -->
    <div v-if="store.loading" class="mx-auto max-w-4xl space-y-6 animate-pulse">
      <div class="h-5 w-32 rounded bg-cream-200 dark:bg-navy-700" />
      <div class="h-9 w-3/4 rounded bg-cream-200 dark:bg-navy-700" />
      <div class="h-4 w-1/3 rounded bg-cream-200 dark:bg-navy-700" />
      <div class="aspect-video w-full rounded-xl bg-cream-200 dark:bg-navy-700" />
      <div class="space-y-2">
        <div class="h-4 w-full rounded bg-cream-200 dark:bg-navy-700" />
        <div class="h-4 w-5/6 rounded bg-cream-200 dark:bg-navy-700" />
        <div class="h-4 w-4/6 rounded bg-cream-200 dark:bg-navy-700" />
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="store.error" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-gray-500 dark:text-navy-300">{{ store.error }}</p>
      <AppButton @click="store.fetchCourse(route.params.id)">Tentar novamente</AppButton>
    </div>

    <!-- Conteúdo -->
    <div v-else-if="store.currentCourse" class="mx-auto max-w-4xl">

      <!-- Breadcrumb -->
      <nav class="mb-6 flex items-center gap-2 text-sm">
        <RouterLink
          :to="{ name: 'course-list' }"
          class="text-gray-500 transition-colors hover:text-gray-700 dark:text-navy-400 dark:hover:text-navy-100"
        >
          Cursos
        </RouterLink>
        <span class="text-gray-300 dark:text-navy-600">/</span>
        <span class="truncate text-gray-700 dark:text-navy-300">{{ store.currentCourse.title }}</span>
      </nav>

      <div class="lg:grid lg:grid-cols-3 lg:gap-10">

        <!-- Coluna principal -->
        <div class="lg:col-span-2">
          <!-- Título e meta -->
          <h1 class="text-3xl font-bold leading-tight text-gray-900 dark:text-navy-100">
            {{ store.currentCourse.title }}
          </h1>

          <div class="mt-3 flex flex-wrap items-center gap-3">
            <span
              v-if="store.currentCourse.difficulty"
              class="rounded-full px-2.5 py-0.5 text-xs font-medium"
              :class="DIFFICULTY_COLORS[store.currentCourse.difficulty] ?? 'bg-gray-100 text-gray-600 dark:bg-navy-700 dark:text-navy-300'"
            >
              {{ DIFFICULTY_LABELS[store.currentCourse.difficulty] ?? store.currentCourse.difficulty }}
            </span>
            <span
              v-if="store.currentCourse.instructor_name"
              class="text-sm text-gray-500 dark:text-navy-400"
            >
              Por {{ store.currentCourse.instructor_name }}
            </span>
          </div>

          <!-- Thumbnail -->
          <div v-if="store.currentCourse.thumbnail" class="mt-6 aspect-video w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-navy-700">
            <img
              :src="store.currentCourse.thumbnail"
              :alt="store.currentCourse.title"
              class="h-full w-full object-cover"
            />
          </div>

          <!-- Descrição -->
          <div v-if="store.currentCourse.description" class="mt-8">
            <h2 class="mb-3 text-lg font-semibold text-gray-900 dark:text-navy-100">Sobre o curso</h2>
            <p class="whitespace-pre-line leading-relaxed text-gray-600 dark:text-navy-300">
              {{ store.currentCourse.description }}
            </p>
          </div>

          <!-- Conteúdo do curso: módulos -->
          <div v-if="store.currentCourse.modules?.length" class="mt-8">
            <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-navy-100">
              Conteúdo do curso
              <span class="ml-2 text-sm font-normal text-gray-400 dark:text-navy-500">
                ({{ totalLessons(store.currentCourse) }} aulas)
              </span>
            </h2>
            <div class="space-y-2">
              <div
                v-for="module in store.currentCourse.modules"
                :key="module.id"
                class="overflow-hidden rounded-lg border border-gray-200 dark:border-navy-700"
              >
                <div class="flex items-center justify-between bg-gray-50 px-4 py-3 dark:bg-navy-700">
                  <span class="font-medium text-gray-800 dark:text-navy-100">{{ module.title }}</span>
                  <span v-if="module.lessons?.length" class="text-xs text-gray-500 dark:text-navy-400">
                    {{ module.lessons.length }} {{ module.lessons.length === 1 ? 'aula' : 'aulas' }}
                  </span>
                </div>
                <ul v-if="module.lessons?.length" class="divide-y divide-gray-100 dark:divide-navy-700">
                  <li
                    v-for="lesson in module.lessons"
                    :key="lesson.id"
                    class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-navy-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gray-400 dark:text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="flex-1">{{ lesson.title }}</span>
                    <span v-if="lesson.duration" class="text-xs text-gray-400 dark:text-navy-500">
                      {{ formatDuration(lesson.duration) }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Conteúdo do curso: lista plana -->
          <div v-else-if="store.currentCourse.lessons?.length" class="mt-8">
            <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-navy-100">
              Aulas
              <span class="ml-2 text-sm font-normal text-gray-400 dark:text-navy-500">
                ({{ store.currentCourse.lessons.length }})
              </span>
            </h2>
            <ul class="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 dark:divide-navy-700 dark:border-navy-700">
              <li
                v-for="lesson in store.currentCourse.lessons"
                :key="lesson.id"
                class="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 dark:text-navy-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gray-400 dark:text-navy-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="flex-1">{{ lesson.title }}</span>
                <span v-if="lesson.duration" class="text-xs text-gray-400 dark:text-navy-500">
                  {{ formatDuration(lesson.duration) }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sidebar de compra -->
        <div class="mt-8 lg:mt-0">
          <div class="sticky top-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm dark:border-navy-700 dark:bg-navy-800">
            <!-- Preço -->
            <div class="p-6">
              <div class="text-3xl font-bold text-gray-900 dark:text-navy-100">
                {{ isFree ? 'Gratuito' : formatCurrency(store.currentCourse.price) }}
              </div>
              <div class="mt-4">
                <AppButton
                  v-if="isFree"
                  full
                  :loading="enrolling"
                  :disabled="enrolling"
                  @click="handleEnroll"
                >
                  {{ enrolling ? 'Matriculando...' : 'Matricular-se gratuitamente' }}
                </AppButton>
                <AppButton v-else full @click="handleBuy">Adquirir agora</AppButton>
              </div>
            </div>

            <!-- Detalhes do curso -->
            <div class="border-t border-gray-100 px-6 py-4 dark:border-navy-700">
              <p class="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-navy-500">
                Incluído no curso
              </p>
              <ul class="space-y-2.5 text-sm text-gray-600 dark:text-navy-300">
                <li v-if="totalLessons(store.currentCourse) > 0" class="flex items-center gap-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {{ totalLessons(store.currentCourse) }} {{ totalLessons(store.currentCourse) === 1 ? 'aula em vídeo' : 'aulas em vídeo' }}
                </li>
                <li class="flex items-center gap-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Certificado de conclusão
                </li>
                <li class="flex items-center gap-2.5">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gold-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Acesso vitalício
                </li>
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  </PageWrapper>
</template>
