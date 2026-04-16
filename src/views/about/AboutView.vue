<script setup>
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import PageWrapper from '@/components/layout/PageWrapper.vue'

const router = useRouter()
</script>

<template>
  <PageWrapper>
    <!-- Hero -->
    <div class="mx-auto max-w-3xl py-12 text-center">
      <span class="bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-400 bg-clip-text text-4xl font-bold tracking-widest text-transparent uppercase">
        NousFlow
      </span>
      <p class="mt-4 text-xl font-medium text-gray-700 dark:text-chalk-200">
        Aprendizado que transforma
      </p>
      <p class="mx-auto mt-4 max-w-xl text-gray-500 dark:text-chalk-400">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
      </p>
      <div class="mt-8">
        <AppButton @click="router.push({ name: 'course-list' })">Explorar cursos</AppButton>
      </div>
    </div>

    <!-- Divisor -->
    <div class="mx-auto max-w-3xl border-t border-gray-200 dark:border-chalk-700" />

    <!-- Nossa Missão -->
    <div class="mx-auto max-w-3xl py-12">
      <h2 class="mb-4 text-2xl font-bold text-gray-900 dark:text-chalk-100">Nossa Missão</h2>
      <p class="leading-relaxed text-gray-600 dark:text-chalk-300">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </p>
      <p class="mt-4 leading-relaxed text-gray-600 dark:text-chalk-300">
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit
        anim id est laborum. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
        accusantium doloremque laudantium totam rem aperiam eaque ipsa quae ab illo inventore.
      </p>
    </div>

    <!-- Por que a NousFlow -->
    <div class="mx-auto max-w-3xl pb-12">
      <h2 class="mb-8 text-2xl font-bold text-gray-900 dark:text-chalk-100">Por que a NousFlow?</h2>
      <div class="grid gap-6 sm:grid-cols-3">
        <!-- Card 1 -->
        <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-chalk-700 dark:bg-chalk-800">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="mb-2 font-semibold text-gray-900 dark:text-chalk-100">Flexibilidade</h3>
          <p class="text-sm leading-relaxed text-gray-500 dark:text-chalk-400">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor
            incididunt ut labore.
          </p>
        </div>

        <!-- Card 2 -->
        <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-chalk-700 dark:bg-chalk-800">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 class="mb-2 font-semibold text-gray-900 dark:text-chalk-100">Qualidade</h3>
          <p class="text-sm leading-relaxed text-gray-500 dark:text-chalk-400">
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
        </div>

        <!-- Card 3 -->
        <div class="rounded-xl border border-gray-200 bg-white p-5 dark:border-chalk-700 dark:bg-chalk-800">
          <div class="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="mb-2 font-semibold text-gray-900 dark:text-chalk-100">Comunidade</h3>
          <p class="text-sm leading-relaxed text-gray-500 dark:text-chalk-400">
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat
            nulla pariatur.
          </p>
        </div>
      </div>
    </div>

    <!-- CTA contato -->
    <div class="mx-auto max-w-3xl border-t border-gray-200 py-12 text-center dark:border-chalk-700">
      <h2 class="mb-2 text-xl font-semibold text-gray-900 dark:text-chalk-100">Entre em contato</h2>
      <p class="mb-4 text-gray-500 dark:text-chalk-400">
        Tem alguma dúvida ou sugestão? Fale com a gente.
      </p>
      <a
        href="mailto:contato@nousflow.com"
        class="inline-flex items-center gap-2 text-emerald-600 hover:underline dark:text-emerald-400"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        contato@nousflow.com
      </a>
    </div>
  </PageWrapper>
</template>
