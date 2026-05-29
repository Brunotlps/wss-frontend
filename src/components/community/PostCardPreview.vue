<script setup>
import ReactionBarPreview from './ReactionBarPreview.vue'

defineProps({
  post: { type: Object, required: true },
})
</script>

<template>
  <article class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-white/3">
    <div class="p-5">
      <!-- Author -->
      <div class="mb-4 flex items-center gap-3">
        <div
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold text-dm-navy-900"
          :style="{ backgroundColor: post.author.color }"
        >
          {{ post.author.initials }}
        </div>
        <div class="min-w-0">
          <p class="text-sm font-semibold text-dm-navy-900 dark:text-white">{{ post.author.name }}</p>
          <p class="text-xs text-slate-400 dark:text-dm-navy-300">{{ post.createdAt }}</p>
        </div>
      </div>

      <!-- Content -->
      <p class="leading-relaxed text-slate-700 dark:text-dm-navy-100">{{ post.content }}</p>

      <!-- Tags -->
      <div v-if="post.tags?.length" class="mt-3 flex flex-wrap gap-1.5">
        <span
          v-for="tag in post.tags"
          :key="tag"
          class="rounded-full border border-dm-gold/25 bg-dm-gold/8 px-2.5 py-0.5 text-xs font-medium text-dm-gold"
        >
          #{{ tag }}
        </span>
      </div>
    </div>

    <!-- Reactions -->
    <div class="border-t border-slate-100 px-5 py-3 dark:border-white/5">
      <ReactionBarPreview :likes="post.likes" :comments="post.comments" />
    </div>
  </article>
</template>
