<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { certificateService } from '@/services/certificateService.js'
import { parseDRFError } from '@/utils/errors.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import CertificateCard from '@/components/certificate/CertificateCard.vue'

const router = useRouter()

const certificates = ref([])
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const { data } = await certificateService.getCertificates()
    certificates.value = Array.isArray(data) ? data : (data.results ?? [])
  } catch (err) {
    error.value = parseDRFError(err)
  } finally {
    loading.value = false
  }
})
</script>

<template>
  <PageWrapper>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Meus Certificados</h1>
      <p class="mt-1 text-sm text-gray-500">Seus certificados de conclusão</p>
    </div>

    <!-- Skeletons -->
    <div v-if="loading" class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <div v-for="n in 3" :key="n" class="animate-pulse rounded-xl border border-gray-200 bg-white p-5">
        <div class="mb-4 flex items-center gap-3">
          <div class="h-10 w-10 rounded-lg bg-gray-200" />
          <div class="flex-1 space-y-2">
            <div class="h-4 w-3/4 rounded bg-gray-200" />
            <div class="h-3 w-1/2 rounded bg-gray-200" />
          </div>
        </div>
        <div class="space-y-2 border-t border-gray-100 pt-3">
          <div class="h-3 w-2/3 rounded bg-gray-200" />
          <div class="h-3 w-1/2 rounded bg-gray-200" />
        </div>
        <div class="mt-4 h-9 rounded-md bg-gray-200" />
      </div>
    </div>

    <!-- Erro -->
    <div v-else-if="error" class="flex flex-col items-center gap-3 py-20 text-center">
      <p class="text-gray-500">{{ error }}</p>
      <AppButton variant="secondary" @click="router.go(0)">Tentar novamente</AppButton>
    </div>

    <!-- Estado vazio -->
    <div v-else-if="certificates.length === 0" class="flex flex-col items-center gap-4 py-20 text-center">
      <div class="rounded-full bg-gray-100 p-6">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
      <div>
        <p class="text-lg font-medium text-gray-800">Você ainda não tem certificados</p>
        <p class="mt-1 text-sm text-gray-500">Conclua um curso para receber seu certificado</p>
      </div>
      <AppButton @click="router.push({ name: 'dashboard' })">Ver meus cursos</AppButton>
    </div>

    <!-- Lista de certificados -->
    <div v-else class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <CertificateCard
        v-for="certificate in certificates"
        :key="certificate.id"
        :certificate="certificate"
      />
    </div>
  </PageWrapper>
</template>
