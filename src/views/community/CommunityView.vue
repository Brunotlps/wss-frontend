<script setup>
import PageWrapper from '@/components/layout/PageWrapper.vue'
import CommunityHero from '@/components/community/CommunityHero.vue'
import PostComposerLocked from '@/components/community/PostComposerLocked.vue'
import PostCardPreview from '@/components/community/PostCardPreview.vue'
import ComingSoonOverlay from '@/components/community/ComingSoonOverlay.vue'

const MOCK_POSTS = [
  {
    id: 1,
    author: { name: 'Dupla de Milheiros', initials: 'DM', avatar: '/brand/icon-gold.png', color: '#C8A96E' },
    content: '🚨 Oportunidade imperdível: o programa Esfera está com transferência promocional para Smiles com 80% de bônus até o final do mês. Se você tem pontos acumulados no Santander, agora é a hora de converter. Com o bônus, você consegue uma emissão em econômica para Miami com cerca de 22.000 milhas — muito abaixo da média. Não deixa passar!',
    likes: 124,
    comments: 38,
    createdAt: 'há 3 horas',
    tags: ['Esfera', 'Smiles', 'Santander', 'Promoção'],
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
