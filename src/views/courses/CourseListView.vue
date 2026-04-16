<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCoursesStore } from '@/stores/courses.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import CourseCard from '@/components/course/CourseCard.vue'
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton.vue'

const store = useCoursesStore()

const searchQuery = ref('')
const difficultyFilter = ref('')

const DIFFICULTIES = [
  { value: '', label: 'Todos' },
  { value: 'BEG', label: 'Iniciante' },
  { value: 'INT', label: 'Intermediário' },
  { value: 'ADV', label: 'Avançado' },
]

const filteredCourses = computed(() => {
  let result = store.courses
  const q = searchQuery.value.trim().toLowerCase()
  if (q) {
    result = result.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.instructor_name?.toLowerCase().includes(q),
    )
  }
  if (difficultyFilter.value) {
    result = result.filter((c) => c.difficulty === difficultyFilter.value)
  }
  return result
})

onMounted(() => {
  store.fetchCourses()
})
</script>

<template>
  <PageWrapper>
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-chalk-100">Cursos</h1>
      <p class="mt-2 text-gray-500 dark:text-chalk-400">Explore nosso catálogo e comece a aprender</p>
    </div>

    <!-- Filtros -->
    <div v-if="!store.loading && !store.error && store.courses.length > 0" class="mb-6 space-y-3">
      <!-- Busca por texto -->
      <div class="relative max-w-sm">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-chalk-500"
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Buscar por título ou instrutor..."
          class="w-full rounded-lg border border-gray-300 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 dark:border-chalk-600 dark:bg-chalk-800 dark:text-chalk-100 dark:placeholder-chalk-500 dark:focus:border-emerald-500"
        />
      </div>

      <!-- Filtro de dificuldade -->
      <div class="flex flex-wrap gap-2">
        <button
          v-for="d in DIFFICULTIES"
          :key="d.value"
          class="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
          :class="
            difficultyFilter === d.value
              ? 'border-emerald-500 bg-emerald-500 text-white'
              : 'border-gray-300 bg-white text-gray-600 hover:border-emerald-400 hover:text-emerald-600 dark:border-chalk-600 dark:bg-chalk-800 dark:text-chalk-300 dark:hover:border-emerald-500 dark:hover:text-emerald-400'
          "
          @click="difficultyFilter = d.value"
        >
          {{ d.label }}
        </button>
      </div>
    </div>

    <!-- Skeletons durante carregamento -->
    <div v-if="store.loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CourseCardSkeleton v-for="n in 6" :key="n" />
    </div>

    <!-- Erro -->
    <div v-else-if="store.error" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-gray-500 dark:text-chalk-400">{{ store.error }}</p>
      <AppButton @click="store.fetchCourses()">Tentar novamente</AppButton>
    </div>

    <!-- Estado vazio (sem cursos no catálogo) -->
    <div v-else-if="store.courses.length === 0" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-xl font-medium text-gray-700 dark:text-chalk-200">Nenhum curso disponível ainda</p>
      <p class="text-gray-500 dark:text-chalk-400">Volte em breve para conferir as novidades.</p>
    </div>

    <!-- Sem resultados após filtro -->
    <div v-else-if="filteredCourses.length === 0" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-lg font-medium text-gray-700 dark:text-chalk-200">Nenhum curso encontrado</p>
      <p class="text-gray-500 dark:text-chalk-400">Tente ajustar os filtros de busca.</p>
      <button
        class="text-sm text-emerald-600 hover:underline dark:text-emerald-400"
        @click="searchQuery = ''; difficultyFilter = ''"
      >
        Limpar filtros
      </button>
    </div>

    <!-- Grid de cursos -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CourseCard v-for="course in filteredCourses" :key="course.id" :course="course" />
    </div>
  </PageWrapper>
</template>
