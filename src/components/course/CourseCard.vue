<script setup>
import { useAuthStore } from '@/stores/auth.js'
import { useRouter } from 'vue-router'
import { formatCurrency } from '@/utils/formatters.js'

const props = defineProps({
  course: { type: Object, required: true },
})

const auth = useAuthStore()
const router = useRouter()

function handleBuy() {
  if (auth.isAuthenticated) {
    router.push({ name: 'checkout', params: { courseId: props.course.id } })
  } else {
    router.push({ name: 'login', query: { redirect: `/checkout/${props.course.id}` } })
  }
}
</script>

<template>
  <div class="flex h-full flex-col overflow-hidden rounded-2xl bg-dm-navy-900 transition-transform duration-300 hover:-translate-y-1">
    <!-- Thumbnail -->
    <RouterLink :to="{ name: 'course-detail', params: { id: course.id } }">
      <div class="aspect-video w-full overflow-hidden bg-dm-navy-800">
        <img
          v-if="course.thumbnail"
          :src="course.thumbnail"
          :alt="course.title"
          class="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div v-else class="flex h-full items-center justify-center text-dm-navy-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.893L15 14M3 8a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
          </svg>
        </div>
      </div>
    </RouterLink>

    <!-- Conteúdo -->
    <div class="flex flex-1 flex-col gap-3 p-5">
      <div class="flex-1">
        <RouterLink :to="{ name: 'course-detail', params: { id: course.id } }">
          <h3 class="font-display font-semibold leading-snug text-white line-clamp-2 hover:text-dm-gold transition-colors">
            {{ course.title }}
          </h3>
        </RouterLink>
        <p v-if="course.instructor_name" class="mt-1 text-sm text-dm-navy-200">
          {{ course.instructor_name }}
        </p>
      </div>

      <div class="flex items-center justify-between pt-1">
        <span class="font-display text-lg font-bold text-dm-gold">
          {{ formatCurrency(course.price) }}
        </span>
        <button
          class="rounded-full bg-dm-gold px-4 py-1.5 text-sm font-semibold text-dm-navy-900 transition-opacity hover:opacity-90"
          @click="handleBuy"
        >
          Adquirir
        </button>
      </div>
    </div>
  </div>
</template>
