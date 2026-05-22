<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { certificateService } from '@/services/certificateService.js'
import { parseDRFError } from '@/utils/errors.js'
import PageWrapper from '@/components/layout/PageWrapper.vue'
import AppButton from '@/components/ui/AppButton.vue'
import CertificateCard from '@/components/certificate/CertificateCard.vue'
import RevealSection from '@/components/ui/RevealSection.vue'

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
  <PageWrapper :full="true">

    <!-- Cabeçalho -->
    <section class="bg-dm-navy-900 px-4 py-12 sm:px-6 lg:px-8">
      <RevealSection animation="up" class="mx-auto max-w-6xl">
        <h1 class="font-display text-3xl font-bold text-white">Meus Certificados</h1>
        <p class="mt-1 text-dm-navy-200">Seus certificados de conclusão</p>
      </RevealSection>
    </section>

    <!-- Conteúdo -->
    <section class="bg-dm-navy-800 px-4 py-10 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">

        <!-- Skeletons -->
        <div v-if="loading" class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="n in 3" :key="n" class="animate-pulse rounded-2xl bg-dm-navy-900 p-5">
            <div class="mb-4 flex items-center gap-3">
              <div class="h-10 w-10 rounded-xl bg-dm-navy-700" />
              <div class="flex-1 space-y-2">
                <div class="h-4 w-3/4 rounded-full bg-dm-navy-700" />
                <div class="h-3 w-1/2 rounded-full bg-dm-navy-700" />
              </div>
            </div>
            <div class="space-y-2 border-t border-dm-navy-700 pt-3">
              <div class="h-3 w-2/3 rounded-full bg-dm-navy-700" />
              <div class="h-3 w-1/2 rounded-full bg-dm-navy-700" />
            </div>
            <div class="mt-4 h-9 rounded-full bg-dm-navy-700" />
          </div>
        </div>

        <!-- Erro -->
        <div v-else-if="error" class="flex flex-col items-center gap-3 py-20 text-center">
          <p class="text-dm-navy-200">{{ error }}</p>
          <AppButton variant="secondary" @click="router.go(0)">Tentar novamente</AppButton>
        </div>

        <!-- Estado vazio -->
        <div v-else-if="certificates.length === 0" class="flex flex-col items-center gap-5 py-24 text-center">
          <img src="/brand/icon-gold.png" alt="" class="h-16 w-auto opacity-30" />
          <div>
            <p class="font-display text-xl font-semibold text-white">Você ainda não tem certificados</p>
            <p class="mt-1 text-sm text-dm-navy-200">Conclua um curso para receber seu certificado</p>
          </div>
          <AppButton @click="router.push({ name: 'dashboard' })">Ver meus cursos</AppButton>
        </div>

        <!-- Lista -->
        <div v-else class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <RevealSection
            v-for="(certificate, i) in certificates"
            :key="certificate.id"
            animation="up"
            :delay="(i % 3) * 100"
          >
            <CertificateCard :certificate="certificate" />
          </RevealSection>
        </div>

      </div>
    </section>

  </PageWrapper>
</template>
