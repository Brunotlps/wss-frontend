<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCoursesStore } from '@/stores/courses.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import RevealSection from '@/components/ui/RevealSection.vue'
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
  <PageWrapper :full="true">

    <!-- ── Hero / Cabeçalho ── -->
    <section class="bg-dm-navy-900 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <RevealSection animation="up">
          <h1 class="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Cursos disponíveis
          </h1>
          <p class="mt-3 max-w-xl text-dm-navy-200">
            Do iniciante ao avançado — aprenda a acumular milhas e viajar mais gastando menos.
          </p>
        </RevealSection>

        <!-- Filtros -->
        <RevealSection v-if="!store.loading && store.courses.length > 0" animation="up" :delay="100" class="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <!-- Busca -->
          <div class="relative max-w-sm flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-dm-navy-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar curso ou instrutor..."
              class="w-full rounded-full border border-dm-navy-700 bg-dm-navy-800 py-2.5 pl-10 pr-4 text-sm text-white placeholder-dm-navy-200 focus:border-dm-gold focus:outline-none focus:ring-1 focus:ring-dm-gold"
            />
          </div>

          <!-- Filtro dificuldade -->
          <div class="flex flex-wrap gap-2">
            <button
              v-for="d in DIFFICULTIES"
              :key="d.value"
              class="rounded-full border px-4 py-1.5 text-xs font-semibold transition-colors"
              :class="
                difficultyFilter === d.value
                  ? 'border-dm-gold bg-dm-gold text-dm-navy-900'
                  : 'border-dm-navy-700 bg-dm-navy-800 text-dm-navy-200 hover:border-dm-gold hover:text-dm-gold'
              "
              @click="difficultyFilter = d.value"
            >
              {{ d.label }}
            </button>
          </div>
        </RevealSection>
      </div>
    </section>

    <!-- ── Lista de Cursos ── -->
    <section class="bg-dm-navy-800 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <!-- Skeletons -->
        <div v-if="store.loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCardSkeleton v-for="n in 6" :key="n" />
        </div>

        <!-- Erro -->
        <div v-else-if="store.error" class="flex flex-col items-center gap-4 py-24 text-center">
          <p class="text-dm-navy-200">{{ store.error }}</p>
          <AppButton @click="store.fetchCourses()">Tentar novamente</AppButton>
        </div>

        <!-- Sem cursos no catálogo -->
        <div v-else-if="store.courses.length === 0" class="flex flex-col items-center gap-3 py-24 text-center">
          <img src="/brand/icon-gold.png" alt="" class="mb-2 h-14 w-auto opacity-40" />
          <p class="font-display text-xl font-semibold text-white">Nenhum curso disponível ainda</p>
          <p class="text-dm-navy-200">Volte em breve para conferir as novidades.</p>
        </div>

        <!-- Sem resultados após filtro -->
        <div v-else-if="filteredCourses.length === 0" class="flex flex-col items-center gap-3 py-24 text-center">
          <p class="font-display text-lg font-semibold text-white">Nenhum curso encontrado</p>
          <p class="text-dm-navy-200">Tente ajustar os filtros de busca.</p>
          <button
            class="mt-2 text-sm text-dm-gold hover:underline"
            @click="searchQuery = ''; difficultyFilter = ''"
          >
            Limpar filtros
          </button>
        </div>

        <!-- Grid de cursos -->
        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RevealSection
            v-for="(course, i) in filteredCourses"
            :key="course.id"
            animation="up"
            :delay="(i % 3) * 100"
          >
            <CourseCard :course="course" />
          </RevealSection>
        </div>

      </div>
    </section>

  </PageWrapper>
</template>
