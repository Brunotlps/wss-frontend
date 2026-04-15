<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { enrollmentService } from '@/services/enrollmentService.js'
import { lessonService } from '@/services/lessonService.js'
import { useVideoProgress } from '@/composables/useVideoProgress.js'
import { parseDRFError } from '@/utils/errors.js'
import LessonItem from '@/components/course/LessonItem.vue'
import AppButton from '@/components/ui/AppButton.vue'

const route = useRoute()
const router = useRouter()
const enrollmentId = Number(route.params.enrollmentId)

// — Estado da página
const pageStatus = ref('loading') // loading | ready | error
const errorMessage = ref('')
const lessonLoading = ref(false)

// — Dados
const enrollment = ref(null)
const lessons = ref([])
const currentLesson = ref(null)

// — Refs do DOM
const videoRef = ref(null)

// — Progresso
const progress = useVideoProgress()

// — IDs das aulas concluídas (derivado do lesson_progress do enrollment)
const completedLessonIds = computed(() => {
  const lp = enrollment.value?.lesson_progress ?? []
  return new Set(lp.filter((p) => p.completed).map((p) => p.lesson))
})

// — Carregar detalhe de uma aula e inicializar progresso
async function loadLesson(lessonId) {
  lessonLoading.value = true
  progress.destroy()

  try {
    const { data } = await lessonService.getLesson(lessonId)
    currentLesson.value = data

    await nextTick()

    if (videoRef.value) {
      await progress.init(enrollmentId, lessonId, videoRef.value)
    }
  } finally {
    lessonLoading.value = false
  }
}

// — Aplicar posição de retomada quando o vídeo carrega metadados
function handleLoadedMetadata() {
  if (progress.resumeAt.value > 0 && videoRef.value) {
    videoRef.value.currentTime = progress.resumeAt.value
  }
}

// — Ao terminar o vídeo: salvar conclusão e avançar automaticamente
async function handleEnded() {
  await progress.onEnded()

  // Atualiza estado local para a sidebar refletir a conclusão imediatamente
  if (enrollment.value && currentLesson.value) {
    const lp = enrollment.value.lesson_progress
    const existing = lp.find((p) => p.lesson === currentLesson.value.id)
    if (existing) {
      existing.completed = true
    } else {
      lp.push({ lesson: currentLesson.value.id, completed: true, watched_duration: currentLesson.value.duration })
    }
  }

  if (currentLesson.value?.next_lesson) {
    await loadLesson(currentLesson.value.next_lesson.id)
  }
}

// — Navegação manual
async function selectLesson(lesson) {
  if (lesson.id === currentLesson.value?.id) return
  await loadLesson(lesson.id)
}

async function goToPrev() {
  if (currentLesson.value?.previous_lesson) {
    await loadLesson(currentLesson.value.previous_lesson.id)
  }
}

async function goToNext() {
  if (currentLesson.value?.next_lesson) {
    await loadLesson(currentLesson.value.next_lesson.id)
  }
}

// — Inicialização
onMounted(async () => {
  try {
    const [enrollRes, ] = await Promise.all([
      enrollmentService.getEnrollment(enrollmentId),
    ])
    enrollment.value = enrollRes.data

    const courseId = enrollment.value.course.id
    const lessonsRes = await lessonService.getLessons(courseId)
    const lessonsData = lessonsRes.data
    lessons.value = Array.isArray(lessonsData) ? lessonsData : (lessonsData.results ?? [])

    pageStatus.value = 'ready'
    await nextTick()

    const startId = enrollment.value.next_lesson?.id ?? lessons.value[0]?.id
    if (startId) {
      await loadLesson(startId)
    }
  } catch (err) {
    errorMessage.value = parseDRFError(err)
    pageStatus.value = 'error'
  }
})

onUnmounted(() => {
  progress.destroy()
})
</script>

<template>
  <!-- Loading inicial da página -->
  <div v-if="pageStatus === 'loading'" class="flex min-h-screen items-center justify-center bg-chalk-900">
    <svg class="h-10 w-10 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  </div>

  <!-- Erro ao carregar enrollment -->
  <div v-else-if="pageStatus === 'error'" class="flex min-h-screen flex-col items-center justify-center gap-4 bg-chalk-900 text-center">
    <p class="text-chalk-200">{{ errorMessage }}</p>
    <AppButton variant="secondary" @click="router.push({ name: 'dashboard' })">
      Voltar para Meus Cursos
    </AppButton>
  </div>

  <!-- Player -->
  <div v-else class="flex bg-chalk-900" style="min-height: calc(100vh - 65px)">
    <!-- Área principal: vídeo + info -->
    <div class="flex flex-1 flex-col overflow-y-auto">
      <!-- Player de vídeo -->
      <div class="relative w-full bg-black" style="aspect-ratio: 16/9">
        <!-- Spinner enquanto aula carrega -->
        <div
          v-if="lessonLoading"
          class="absolute inset-0 flex items-center justify-center bg-black"
        >
          <svg class="h-10 w-10 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        </div>

        <video
          v-show="!lessonLoading && currentLesson"
          ref="videoRef"
          class="h-full w-full"
          controls
          :src="currentLesson?.video?.file"
          @timeupdate="progress.onTimeUpdate"
          @ended="handleEnded"
          @loadedmetadata="handleLoadedMetadata"
        />
      </div>

      <!-- Info da aula + navegação -->
      <div class="bg-chalk-800 p-6">
        <!-- Breadcrumb / título do curso -->
        <button
          class="mb-4 flex items-center gap-1.5 text-sm text-chalk-400 hover:text-chalk-200"
          @click="router.push({ name: 'dashboard' })"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          {{ enrollment?.course?.title }}
        </button>

        <div v-if="currentLesson" class="space-y-4">
          <div>
            <p class="text-xs font-medium uppercase tracking-wide text-chalk-400">
              Aula {{ currentLesson.order }}
            </p>
            <h2 class="mt-1 text-xl font-semibold text-chalk-100">{{ currentLesson.title }}</h2>
            <p v-if="currentLesson.description" class="mt-2 text-sm leading-relaxed text-chalk-300">
              {{ currentLesson.description }}
            </p>
          </div>

          <!-- Botões de navegação -->
          <div class="flex items-center gap-3 pt-2">
            <AppButton
              variant="secondary"
              :disabled="!currentLesson.previous_lesson"
              @click="goToPrev"
            >
              ← Anterior
            </AppButton>
            <AppButton
              :disabled="!currentLesson.next_lesson"
              @click="goToNext"
            >
              Próxima →
            </AppButton>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar: lista de aulas -->
    <div class="hidden w-80 flex-shrink-0 lg:block">
      <div class="sticky top-0 flex max-h-screen flex-col overflow-hidden border-l border-chalk-700 bg-chalk-800">
        <!-- Cabeçalho da sidebar -->
        <div class="border-b border-chalk-700 px-4 py-4">
          <p class="font-medium text-chalk-100">Conteúdo do curso</p>
          <p class="mt-0.5 text-xs text-chalk-400">{{ lessons.length }} {{ lessons.length === 1 ? 'aula' : 'aulas' }}</p>
        </div>

        <!-- Lista de aulas (scrollável) -->
        <div class="flex-1 overflow-y-auto py-2">
          <LessonItem
            v-for="lesson in lessons"
            :key="lesson.id"
            :lesson="lesson"
            :is-active="currentLesson?.id === lesson.id"
            :is-completed="completedLessonIds.has(lesson.id)"
            @select="selectLesson"
          />
        </div>
      </div>
    </div>
  </div>
</template>
