<script setup>
import { onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCoursesStore } from '@/stores/courses.js'
import { useAuthStore } from '@/stores/auth.js'
import { formatCurrency, formatDuration } from '@/utils/formatters.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'

const route = useRoute()
const router = useRouter()
const store = useCoursesStore()
const auth = useAuthStore()

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
</script>

<template>
  <PageWrapper>
    <!-- Skeleton de carregamento -->
    <div v-if="store.loading" class="space-y-6 animate-pulse">
      <div class="h-8 w-2/3 rounded bg-gray-200" />
      <div class="h-4 w-1/3 rounded bg-gray-200" />
      <div class="aspect-video w-full rounded-xl bg-gray-200" />
      <div class="space-y-2">
        <div class="h-4 w-full rounded bg-gray-200" />
        <div class="h-4 w-5/6 rounded bg-gray-200" />
        <div class="h-4 w-4/6 rounded bg-gray-200" />
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="store.error" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-gray-500 dark:text-chalk-400">{{ store.error }}</p>
      <button
        class="rounded-md bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-2 text-sm text-white hover:opacity-90"
        @click="store.fetchCourse(route.params.id)"
      >
        Tentar novamente
      </button>
    </div>

    <!-- Conteúdo do curso -->
    <div v-else-if="store.currentCourse" class="mx-auto max-w-4xl">
      <div class="lg:grid lg:grid-cols-3 lg:gap-10">

        <!-- Coluna principal -->
        <div class="lg:col-span-2">
          <div class="mb-2 flex items-center gap-2">
            <RouterLink :to="{ name: 'course-list' }" class="text-sm text-gray-500 hover:text-gray-700 dark:text-chalk-400 dark:hover:text-chalk-200">
              Cursos
            </RouterLink>
            <span class="text-gray-300 dark:text-chalk-600">/</span>
            <span class="text-sm text-gray-700 dark:text-chalk-300">{{ store.currentCourse.title }}</span>
          </div>

          <h1 class="text-3xl font-bold leading-tight text-gray-900 dark:text-chalk-100">
            {{ store.currentCourse.title }}
          </h1>

          <p v-if="store.currentCourse.instructor_name" class="mt-2 text-gray-500 dark:text-chalk-400">
            Por {{ store.currentCourse.instructor_name }}
          </p>

          <!-- Thumbnail -->
          <div v-if="store.currentCourse.thumbnail" class="mt-6 overflow-hidden rounded-xl">
            <img
              :src="store.currentCourse.thumbnail"
              :alt="store.currentCourse.title"
              class="w-full object-cover"
            />
          </div>

          <!-- Descrição -->
          <div v-if="store.currentCourse.description" class="mt-6">
            <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-chalk-100">Sobre o curso</h2>
            <p class="whitespace-pre-line leading-relaxed text-gray-600 dark:text-chalk-300">
              {{ store.currentCourse.description }}
            </p>
          </div>

          <!-- Módulos e aulas -->
          <div v-if="store.currentCourse.modules?.length" class="mt-8">
            <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-chalk-100">Conteúdo do curso</h2>
            <div class="space-y-3">
              <div
                v-for="module in store.currentCourse.modules"
                :key="module.id"
                class="overflow-hidden rounded-lg border border-gray-200 dark:border-chalk-700"
              >
                <div class="flex items-center justify-between bg-gray-50 px-4 py-3 dark:bg-chalk-700">
                  <span class="font-medium text-gray-800 dark:text-chalk-100">{{ module.title }}</span>
                  <span v-if="module.lessons?.length" class="text-sm text-gray-500 dark:text-chalk-400">
                    {{ module.lessons.length }} aula{{ module.lessons.length !== 1 ? 's' : '' }}
                  </span>
                </div>
                <ul v-if="module.lessons?.length" class="divide-y divide-gray-100 dark:divide-chalk-700">
                  <li
                    v-for="lesson in module.lessons"
                    :key="lesson.id"
                    class="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-chalk-300"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gray-400 dark:text-chalk-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span class="flex-1">{{ lesson.title }}</span>
                    <span v-if="lesson.duration" class="text-gray-400 dark:text-chalk-500">
                      {{ formatDuration(lesson.duration) }}
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <!-- Fallback: lista plana de aulas sem módulos -->
          <div v-else-if="store.currentCourse.lessons?.length" class="mt-8">
            <h2 class="mb-4 text-lg font-semibold text-gray-900 dark:text-chalk-100">Aulas</h2>
            <ul class="divide-y divide-gray-100 overflow-hidden rounded-lg border border-gray-200 dark:divide-chalk-700 dark:border-chalk-700">
              <li
                v-for="lesson in store.currentCourse.lessons"
                :key="lesson.id"
                class="flex items-center gap-3 px-4 py-3 text-sm text-gray-600 dark:text-chalk-300"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-gray-400 dark:text-chalk-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="flex-1">{{ lesson.title }}</span>
                <span v-if="lesson.duration" class="text-gray-400 dark:text-chalk-500">
                  {{ formatDuration(lesson.duration) }}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <!-- Sidebar de compra (sticky no desktop) -->
        <div class="mt-8 lg:mt-0">
          <div class="sticky top-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-chalk-700 dark:bg-chalk-800">
            <div class="mb-4 text-3xl font-bold text-gray-900 dark:text-chalk-100">
              {{ formatCurrency(store.currentCourse.price) }}
            </div>

            <button
              class="w-full rounded-md bg-gradient-to-r from-emerald-600 to-teal-500 px-4 py-3 font-medium text-white transition-opacity hover:opacity-90"
              @click="handleBuy"
            >
              Comprar agora
            </button>

            <div v-if="store.currentCourse.modules?.length || store.currentCourse.lessons?.length" class="mt-4 space-y-2 text-sm text-gray-500 dark:text-chalk-400">
              <p class="flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                {{
                  store.currentCourse.modules
                    ? store.currentCourse.modules.reduce((acc, m) => acc + (m.lessons?.length ?? 0), 0)
                    : store.currentCourse.lessons?.length
                }} aula(s)
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </PageWrapper>
</template>
