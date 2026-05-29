<script setup>
import PageWrapper from '@/components/layout/PageWrapper.vue'
import CommunityHero from '@/components/community/CommunityHero.vue'
import PostComposerLocked from '@/components/community/PostComposerLocked.vue'
import PostCardPreview from '@/components/community/PostCardPreview.vue'
import ComingSoonOverlay from '@/components/community/ComingSoonOverlay.vue'

const MOCK_POSTS = [
  {
    id: 1,
    author: { name: 'Ana Costa', initials: 'AC', color: '#C8A96E' },
    content: 'Finalmente consegui emitir dois voos executivos para Lisboa com pontos Livelo! A dica é monitorar as janelas de disponibilidade nas terças à noite — as companhias costumam liberar assentos nesse horário. Valeu cada ponto acumulado!',
    likes: 47,
    comments: 12,
    createdAt: 'há 2 horas',
    tags: ['Livelo', 'TAP', 'Executiva'],
  },
  {
    id: 2,
    author: { name: 'Rafael Mendes', initials: 'RM', color: '#4A7FA5' },
    content: 'Dica rápida: cartão Itaucard Personnalité Visa Infinite tá com promoção de bônus na transferência pro Latam Pass essa semana. 100% de bônus até domingo. Já transferi os meus, valeu muito a pena para uma emissão que estava planejando.',
    likes: 83,
    comments: 24,
    createdAt: 'há 5 horas',
    tags: ['Itaucard', 'LatamPass', 'Promoção'],
  },
  {
    id: 3,
    author: { name: 'Mariana Figueiredo', initials: 'MF', color: '#7E6B8F' },
    content: 'Acabei de completar o módulo de hotéis do curso e já apliquei a estratégia de pontos no Marriott Bonvoy. Consegui uma diária no Sheraton Rio por 12.500 pontos que normalmente custaria R$ 650. Educação financeira em milhas funciona mesmo!',
    likes: 31,
    comments: 8,
    createdAt: 'há 1 dia',
    tags: ['Marriott', 'HotelComPontos', 'WSS'],
  },
]
</script>

<template>
  <PageWrapper :full="true">

    <CommunityHero />

    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- Feed section -->
    <section class="relative bg-slate-50 px-4 py-12 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="relative mx-auto max-w-2xl">

        <!-- Conteúdo desfocado (atrás do overlay) -->
        <div class="space-y-4 blur-[2px] select-none" aria-hidden="true">
          <PostComposerLocked />
          <PostCardPreview v-for="post in MOCK_POSTS" :key="post.id" :post="post" />
        </div>

        <!-- Overlay glassmorphism -->
        <ComingSoonOverlay />

      </div>
    </section>

  </PageWrapper>
</template>
