<script setup>
import { onMounted } from 'vue'
import { useCoursesStore } from '@/stores/courses.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import CourseCard from '@/components/course/CourseCard.vue'
import CourseCardSkeleton from '@/components/course/CourseCardSkeleton.vue'

const store = useCoursesStore()

onMounted(() => {
  store.fetchCourses()
})
</script>

<template>
  <PageWrapper>
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Cursos</h1>
      <p class="mt-2 text-gray-500">Explore nosso catálogo e comece a aprender</p>
    </div>

    <!-- Skeletons durante carregamento -->
    <div v-if="store.loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CourseCardSkeleton v-for="n in 6" :key="n" />
    </div>

    <!-- Erro -->
    <div v-else-if="store.error" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-gray-500">{{ store.error }}</p>
      <button
        class="rounded-md bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-700"
        @click="store.fetchCourses()"
      >
        Tentar novamente
      </button>
    </div>

    <!-- Estado vazio -->
    <div v-else-if="store.courses.length === 0" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-xl font-medium text-gray-700">Nenhum curso disponível ainda</p>
      <p class="text-gray-500">Volte em breve para conferir as novidades.</p>
    </div>

    <!-- Grid de cursos -->
    <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <CourseCard v-for="course in store.courses" :key="course.id" :course="course" />
    </div>
  </PageWrapper>
</template>
