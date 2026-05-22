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
import RevealSection from '@/components/ui/RevealSection.vue'

const route = useRoute()
const router = useRouter()
const store = useCoursesStore()
const auth = useAuthStore()

const DIFFICULTY_LABELS = { BEG: 'Iniciante', INT: 'Intermediário', ADV: 'Avançado' }

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
  <PageWrapper :full="true">

    <!-- ── Skeleton ── -->
    <div v-if="store.loading" class="px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl animate-pulse space-y-6">
        <div class="h-5 w-32 rounded-full bg-dm-navy-700" />
        <div class="h-9 w-3/4 rounded-lg bg-dm-navy-700" />
        <div class="h-4 w-1/3 rounded-full bg-dm-navy-700" />
        <div class="aspect-video w-full rounded-2xl bg-dm-navy-700" />
      </div>
    </div>

    <!-- ── Erro ── -->
    <div v-else-if="store.error" class="flex flex-col items-center gap-4 py-24 text-center">
      <p class="text-dm-navy-200">{{ store.error }}</p>
      <AppButton @click="store.fetchCourse(route.params.id)">Tentar novamente</AppButton>
    </div>

    <!-- ── Conteúdo ── -->
    <template v-else-if="store.currentCourse">

      <!-- Hero do curso -->
      <section class="hero-glow bg-white px-4 pb-10 pt-16 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
        <div class="mx-auto max-w-6xl">

          <!-- Breadcrumb -->
          <nav class="mb-6 flex items-center gap-2 text-sm text-dm-navy-200">
            <RouterLink :to="{ name: 'course-list' }" class="transition-colors hover:text-dm-gold">
              Cursos
            </RouterLink>
            <span class="text-dm-navy-700">/</span>
            <span class="truncate text-dm-navy-100">{{ store.currentCourse.title }}</span>
          </nav>

          <div class="lg:grid lg:grid-cols-3 lg:gap-12">

            <!-- Info principal -->
            <div class="lg:col-span-2">
              <RevealSection animation="up">
                <span
                  v-if="store.currentCourse.difficulty"
                  class="mb-3 inline-block rounded-full border border-dm-gold/40 bg-dm-gold/10 px-3 py-0.5 text-xs font-semibold text-dm-gold"
                >
                  {{ DIFFICULTY_LABELS[store.currentCourse.difficulty] ?? store.currentCourse.difficulty }}
                </span>

                <h1 class="font-display text-3xl font-bold leading-tight text-dm-navy-900 sm:text-4xl dark:text-white">
                  {{ store.currentCourse.title }}
                </h1>

                <p v-if="store.currentCourse.instructor_name" class="mt-3 text-sm text-slate-500 dark:text-dm-navy-200">
                  Por <span class="text-slate-700 dark:text-dm-navy-100">{{ store.currentCourse.instructor_name }}</span>
                </p>
              </RevealSection>

              <!-- Thumbnail -->
              <RevealSection v-if="store.currentCourse.thumbnail" animation="up" :delay="100" class="mt-6">
                <div class="aspect-video w-full overflow-hidden rounded-2xl bg-dm-navy-800">
                  <img
                    :src="store.currentCourse.thumbnail"
                    :alt="store.currentCourse.title"
                    class="h-full w-full object-cover"
                  />
                </div>
              </RevealSection>
            </div>

            <!-- Card de compra sticky (desktop) -->
            <div class="hidden lg:block">
              <div class="sticky top-24 overflow-hidden rounded-2xl border border-white/10 bg-white/4 shadow-2xl shadow-black/40 backdrop-blur-sm">
                <div class="p-6">
                  <p class="font-display text-3xl font-bold text-dm-navy-900 dark:text-white">
                    {{ isFree ? 'Gratuito' : formatCurrency(store.currentCourse.price) }}
                  </p>
                  <div class="mt-5">
                    <AppButton
                      v-if="isFree"
                      full
                      :loading="enrolling"
                      :disabled="enrolling"
                      @click="handleEnroll"
                    >
                      {{ enrolling ? 'Matriculando...' : 'Matricular gratuitamente' }}
                    </AppButton>
                    <AppButton v-else full @click="handleBuy">Adquirir agora</AppButton>
                  </div>
                </div>
                <div class="border-t border-dm-navy-700 px-6 py-4">
                  <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-dm-navy-200">Incluído</p>
                  <ul class="space-y-2.5 text-sm text-dm-navy-100">
                    <li v-if="totalLessons(store.currentCourse) > 0" class="flex items-center gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {{ totalLessons(store.currentCourse) }} {{ totalLessons(store.currentCourse) === 1 ? 'aula em vídeo' : 'aulas em vídeo' }}
                    </li>
                    <li class="flex items-center gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Certificado de conclusão
                    </li>
                    <li class="flex items-center gap-2.5">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
      </section>

      <!-- ── Detalhes ── -->
      <div class="mx-auto max-w-6xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />
      <section class="bg-slate-50 px-4 py-14 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
        <div class="mx-auto max-w-6xl lg:grid lg:grid-cols-3 lg:gap-12">
          <div class="lg:col-span-2 space-y-10">

            <!-- Descrição -->
            <RevealSection v-if="store.currentCourse.description" animation="up">
              <h2 class="mb-4 font-display text-xl font-bold text-dm-navy-900 dark:text-white">Sobre o curso</h2>
              <p class="whitespace-pre-line leading-relaxed text-slate-600 dark:text-dm-navy-200">
                {{ store.currentCourse.description }}
              </p>
            </RevealSection>

            <!-- Módulos -->
            <RevealSection v-if="store.currentCourse.modules?.length" animation="up" :delay="100">
              <h2 class="mb-4 font-display text-xl font-bold text-white">
                Conteúdo
                <span class="ml-2 text-sm font-normal text-dm-navy-200">({{ totalLessons(store.currentCourse) }} aulas)</span>
              </h2>
              <div class="space-y-2">
                <div
                  v-for="module in store.currentCourse.modules"
                  :key="module.id"
                  class="overflow-hidden rounded-xl border border-white/8"
                >
                  <div class="flex items-center justify-between bg-white/3 px-4 py-3">
                    <span class="font-medium text-dm-navy-100">{{ module.title }}</span>
                    <span v-if="module.lessons?.length" class="text-xs text-dm-navy-200">
                      {{ module.lessons.length }} {{ module.lessons.length === 1 ? 'aula' : 'aulas' }}
                    </span>
                  </div>
                  <ul v-if="module.lessons?.length" class="divide-y divide-white/5">
                    <li
                      v-for="lesson in module.lessons"
                      :key="lesson.id"
                      class="flex items-center gap-3 px-4 py-2.5 text-sm text-dm-navy-200"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0 text-dm-navy-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span class="flex-1">{{ lesson.title }}</span>
                      <span v-if="lesson.duration" class="text-xs text-dm-navy-200">{{ formatDuration(lesson.duration) }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </RevealSection>

            <!-- Lista plana de aulas -->
            <RevealSection v-else-if="store.currentCourse.lessons?.length" animation="up" :delay="100">
              <h2 class="mb-4 font-display text-xl font-bold text-white">
                Aulas <span class="ml-2 text-sm font-normal text-dm-navy-200">({{ store.currentCourse.lessons.length }})</span>
              </h2>
              <ul class="divide-y divide-white/5 overflow-hidden rounded-xl border border-white/8">
                <li
                  v-for="lesson in store.currentCourse.lessons"
                  :key="lesson.id"
                  class="flex items-center gap-3 px-4 py-2.5 text-sm text-dm-navy-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span class="flex-1">{{ lesson.title }}</span>
                  <span v-if="lesson.duration" class="text-xs">{{ formatDuration(lesson.duration) }}</span>
                </li>
              </ul>
            </RevealSection>

          </div>

          <!-- Coluna vazia no desktop (card está sticky na section anterior) -->
          <div class="hidden lg:block" />
        </div>
      </section>

      <!-- ── CTA mobile ── -->
      <section class="sticky bottom-0 border-t border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-sm lg:hidden dark:border-white/8 dark:bg-dm-navy-900/95">
        <div class="flex items-center justify-between gap-4">
          <p class="font-display text-xl font-bold text-dm-navy-900 dark:text-white">
            {{ isFree ? 'Gratuito' : formatCurrency(store.currentCourse.price) }}
          </p>
          <AppButton
            v-if="isFree"
            :loading="enrolling"
            :disabled="enrolling"
            @click="handleEnroll"
          >
            {{ enrolling ? 'Matriculando...' : 'Matricular gratuitamente' }}
          </AppButton>
          <AppButton v-else @click="handleBuy">Adquirir agora</AppButton>
        </div>
      </section>

    </template>
  </PageWrapper>
</template>
