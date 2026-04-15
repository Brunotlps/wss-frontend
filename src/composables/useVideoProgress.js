import { ref } from 'vue'
import { progressService } from '@/services/progressService.js'

export function useVideoProgress() {
  const progressId = ref(null)
  const resumeAt = ref(0)

  let _videoEl = null
  let _debounceTimer = null

  async function init(enrollmentId, lessonId, videoEl) {
    // Limpa estado da aula anterior
    destroy()
    progressId.value = null
    resumeAt.value = 0
    _videoEl = videoEl

    try {
      const { data } = await progressService.getProgress(enrollmentId, lessonId)
      const list = Array.isArray(data) ? data : (data.results ?? [])

      if (list.length > 0) {
        progressId.value = list[0].id
        resumeAt.value = list[0].watched_duration ?? 0
      } else {
        const { data: created } = await progressService.createProgress({
          enrollment_id: enrollmentId,
          lesson_id: lessonId,
          watched_duration: 0,
        })
        progressId.value = created.id
      }
    } catch (err) {
      console.warn('[useVideoProgress] init error:', err?.message)
    }
  }

  function onTimeUpdate() {
    if (!progressId.value || !_videoEl) return
    clearTimeout(_debounceTimer)
    _debounceTimer = setTimeout(async () => {
      const watched = Math.floor(_videoEl.currentTime)
      try {
        await progressService.updateProgress(progressId.value, { watched_duration: watched })
      } catch (err) {
        console.warn('[useVideoProgress] update error:', err?.message)
      }
    }, 5000)
  }

  async function onEnded() {
    if (!progressId.value) return
    clearTimeout(_debounceTimer)
    try {
      await progressService.updateProgress(progressId.value, { completed: true })
    } catch (err) {
      console.warn('[useVideoProgress] complete error:', err?.message)
    }
  }

  function destroy() {
    clearTimeout(_debounceTimer)
    _debounceTimer = null
    _videoEl = null
  }

  return { init, resumeAt, onTimeUpdate, onEnded, destroy }
}
