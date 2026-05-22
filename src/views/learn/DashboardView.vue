<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { enrollmentService } from '@/services/enrollmentService.js'
import { parseDRFError } from '@/utils/errors.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import CourseProgress from '@/components/course/CourseProgress.vue'
import RevealSection from '@/components/ui/RevealSection.vue'

const router = useRouter()

const enrollments = ref([])
const loading = ref(true)
const error = ref('')

const DIFFICULTY_LABELS = { BEG: 'Iniciante', INT: 'Intermediário', ADV: 'Avançado' }

onMounted(async () => {
  try {
    const { data } = await enrollmentService.getEnrollments()
    const list = Array.isArray(data) ? data : (data.results ?? [])
    enrollments.value = list.filter((e) => e.is_active)
  } catch (err) {
    error.value = parseDRFError(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <PageWrapper :full="true">

    <!-- Hero -->
    <section class="hero-glow px-4 pb-14 pt-20 sm:px-6 lg:px-8">
      <RevealSection animation="up" class="mx-auto max-w-6xl">
        <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-dm-gold">Área do aluno</p>
        <h1 class="font-display text-4xl font-bold text-white sm:text-5xl">Meus Cursos</h1>
        <p class="mt-3 text-dm-navy-200">Continue de onde parou</p>
      </RevealSection>
    </section>

    <div class="section-divider" />

    <!-- Conteúdo -->
    <section class="px-4 py-16 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <!-- Skeletons -->
        <div v-if="loading" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 3" :key="n" class="animate-pulse overflow-hidden rounded-2xl border border-white/5 bg-white/3">
            <div class="aspect-video w-full bg-dm-navy-800" />
            <div class="p-5 space-y-3">
              <div class="h-4 w-3/4 rounded-full bg-dm-navy-700" />
              <div class="h-3 w-1/2 rounded-full bg-dm-navy-700" />
              <div class="h-2 rounded-full bg-dm-navy-700" />
            </div>
          </div>
        </div>

        <!-- Erro -->
        <div v-else-if="error" class="flex flex-col items-center gap-3 py-24 text-center">
          <p class="text-dm-navy-200">{{ error }}</p>
          <AppButton variant="secondary" @click="router.go(0)">Tentar novamente</AppButton>
        </div>

        <!-- Estado vazio -->
        <div v-else-if="enrollments.length === 0" class="flex flex-col items-center gap-5 py-28 text-center">
          <div class="flex h-20 w-20 items-center justify-center rounded-full bg-dm-gold/10">
            <img src="/brand/icon-gold.png" alt="" class="h-10 w-auto opacity-60" />
          </div>
          <div>
            <p class="font-display text-xl font-semibold text-white">Você ainda não tem cursos</p>
            <p class="mt-1 text-sm text-dm-navy-200">Explore o catálogo e comece a aprender</p>
          </div>
          <AppButton @click="router.push({ name: 'course-list' })">Ver catálogo</AppButton>
        </div>

        <!-- Grid de matrículas -->
        <div v-else class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RevealSection
            v-for="(enrollment, i) in enrollments"
            :key="enrollment.id"
            animation="up"
            :delay="(i % 3) * 100"
          >
            <div class="card-glow flex flex-col overflow-hidden rounded-2xl border border-white/8 bg-white/3">
              <!-- Thumbnail -->
              <div class="aspect-video w-full overflow-hidden bg-dm-navy-800">
                <img
                  v-if="enrollment.course.thumbnail"
                  :src="enrollment.course.thumbnail"
                  :alt="enrollment.course.title"
                  class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                <div v-else class="flex h-full items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-dm-navy-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.893L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
                  </svg>
                </div>
              </div>

              <!-- Conteúdo -->
              <div class="flex flex-1 flex-col gap-4 p-5">
                <div class="flex-1">
                  <div class="flex items-start justify-between gap-2">
                    <h3 class="font-display font-semibold leading-snug text-white line-clamp-2">
                      {{ enrollment.course.title }}
                    </h3>
                    <span
                      v-if="enrollment.completed"
                      class="flex-shrink-0 rounded-full bg-dm-gold/15 px-2.5 py-0.5 text-xs font-semibold text-dm-gold"
                    >
                      Concluído
                    </span>
                  </div>
                  <p v-if="enrollment.course.instructor_name" class="mt-1.5 text-sm text-dm-navy-200">
                    {{ enrollment.course.instructor_name }}
                  </p>
                  <p v-if="enrollment.course.difficulty" class="mt-0.5 text-xs text-dm-navy-200/70">
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
          </RevealSection>
        </div>

      </div>
    </section>

  </PageWrapper>
</template>
