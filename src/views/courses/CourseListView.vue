<script setup>
import { ref, computed, onMounted } from 'vue'
import { useCoursesStore } from '@/stores/courses.js'
import { useEnrollmentStore } from '@/stores/enrollment.js'
import { useAuthStore } from '@/stores/auth.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import RevealSection from '@/components/ui/RevealSection.vue'
import CourseCard from '@/components/course/CourseCard.vue'
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton.vue'

const store = useCoursesStore()
const enrollmentStore = useEnrollmentStore()
const auth = useAuthStore()

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
  if (auth.isAuthenticated) enrollmentStore.fetchEnrollments()
})
</script>

<template>
  <PageWrapper :full="true">

    <!-- Hero -->
    <section class="hero-glow bg-white px-4 pb-14 pt-20 sm:px-6 sm:pb-16 sm:pt-24 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-6xl">
        <RevealSection animation="up">
          <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-dm-gold">
            Aprenda com quem voa mais
          </p>
          <h1 class="font-display text-4xl font-bold leading-tight text-dm-navy-900 sm:text-5xl lg:text-6xl dark:text-white">
            Cursos disponíveis
          </h1>
          <p class="mt-4 max-w-lg text-base leading-relaxed text-slate-500 dark:text-dm-navy-200">
            Do iniciante ao avançado — aprenda a acumular milhas e viajar mais gastando menos.
          </p>
        </RevealSection>

        <!-- Filtros -->
        <RevealSection
          v-if="!store.loading && store.courses.length > 0"
          animation="up"
          :delay="100"
          class="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6"
        >
          <div class="relative max-w-sm flex-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 dark:text-dm-navy-200"
              fill="none" viewBox="0 0 24 24" stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Buscar curso ou instrutor..."
              class="w-full rounded-full border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:border-dm-gold/60 focus:outline-none focus:ring-1 focus:ring-dm-gold/40 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-dm-navy-200 dark:focus:border-dm-gold/50"
            />
          </div>

          <div class="flex flex-wrap gap-2">
            <button
              v-for="d in DIFFICULTIES"
              :key="d.value"
              class="rounded-full border px-4 py-1.5 text-xs font-semibold transition-all"
              :class="
                difficultyFilter === d.value
                  ? 'border-dm-gold bg-dm-gold text-dm-navy-900 shadow-sm shadow-dm-gold/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:border-dm-gold/50 hover:text-dm-navy-900 dark:border-white/10 dark:bg-white/5 dark:text-dm-navy-200 dark:hover:border-dm-gold/50 dark:hover:text-dm-gold'
              "
              @click="difficultyFilter = d.value"
            >
              {{ d.label }}
            </button>
          </div>
        </RevealSection>
      </div>
    </section>

    <!-- Divider -->
    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- Cursos -->
    <section class="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-6xl">

        <!-- Skeletons -->
        <div v-if="store.loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CourseCardSkeleton v-for="n in 6" :key="n" />
        </div>

        <!-- Erro -->
        <div v-else-if="store.error" class="flex flex-col items-center gap-4 py-24 text-center">
          <p class="text-slate-500 dark:text-dm-navy-200">{{ store.error }}</p>
          <AppButton @click="store.fetchCourses()">Tentar novamente</AppButton>
        </div>

        <!-- Catálogo vazio -->
        <div v-else-if="store.courses.length === 0" class="flex flex-col items-center gap-4 py-28 text-center">
          <div class="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-dm-gold/10">
            <img src="/brand/icon-gold.png" alt="" class="h-8 w-auto" style="max-width: 32px; object-fit: contain" />
          </div>
          <p class="font-display text-xl font-semibold text-dm-navy-900 dark:text-white">Nenhum curso disponível ainda</p>
          <p class="text-sm text-slate-500 dark:text-dm-navy-200">Volte em breve para conferir as novidades.</p>
        </div>

        <!-- Sem resultados no filtro -->
        <div v-else-if="filteredCourses.length === 0" class="flex flex-col items-center gap-4 py-28 text-center">
          <p class="font-display text-lg font-semibold text-dm-navy-900 dark:text-white">Nenhum curso encontrado</p>
          <p class="text-sm text-slate-500 dark:text-dm-navy-200">Tente ajustar os filtros de busca.</p>
          <button
            class="mt-1 text-sm font-medium text-dm-gold hover:underline"
            @click="searchQuery = ''; difficultyFilter = ''"
          >Limpar filtros</button>
        </div>

        <!-- Grid -->
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
