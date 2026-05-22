<script setup>
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import RevealSection from '@/components/ui/RevealSection.vue'
import PageWrapper from '@/components/layout/PageWrapper.vue'

const router = useRouter()

const benefits = [
  {
    icon: 'M12 19l9 2-9-18-9 18 9-2zm0 0v-8',
    title: 'Aprenda no seu ritmo',
    desc: 'Aulas gravadas disponíveis 24h por dia. Assista quantas vezes quiser, onde estiver.',
  },
  {
    icon: 'M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z',
    title: 'Conteúdo validado',
    desc: 'Estratégias reais testadas por quem viajou o mundo com milhas acumuladas no dia a dia.',
  },
  {
    icon: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z',
    title: 'Comunidade ativa',
    desc: 'Junte-se a milhares de alunos que trocam dicas, promoções e experiências de viagem.',
  },
]

const stats = [
  { value: '5.000+', label: 'Alunos formados' },
  { value: '200+', label: 'Horas de conteúdo' },
  { value: '98%', label: 'Satisfação' },
  { value: '40+', label: 'Destinos cobertos' },
]
</script>

<template>
  <PageWrapper :full="true">

    <!-- ── Hero ── -->
    <section class="relative overflow-hidden bg-dm-navy-900 px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
      <!-- Glow de fundo -->
      <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div class="h-[500px] w-[500px] rounded-full bg-dm-blue opacity-10 blur-[120px]" />
      </div>

      <div class="relative mx-auto max-w-4xl text-center">
        <RevealSection animation="up">
          <img src="/brand/logo-dark.png" alt="Dupla de Milheiros" class="mx-auto mb-8 h-16 w-auto sm:h-20" />
        </RevealSection>

        <RevealSection animation="up" :delay="100">
          <h1 class="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Voe mais longe com<br />
            <span class="text-dm-gold">os seus pontos</span>
          </h1>
        </RevealSection>

        <RevealSection animation="up" :delay="200">
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-dm-navy-200">
            Aprenda a acumular milhas, escolher os melhores cartões e transformar gastos do dia a dia
            em viagens inesquecíveis — com quem já fez isso de verdade.
          </p>
        </RevealSection>

        <RevealSection animation="up" :delay="300">
          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <AppButton @click="router.push({ name: 'course-list' })">
              Explorar cursos
            </AppButton>
            <AppButton variant="outline" @click="router.push({ name: 'register' })">
              Criar conta grátis
            </AppButton>
          </div>
        </RevealSection>
      </div>
    </section>

    <!-- ── Stats ── -->
    <section class="bg-dm-navy-800 px-4 py-12 sm:px-6 lg:px-8">
      <div class="mx-auto grid max-w-5xl grid-cols-2 gap-6 sm:grid-cols-4">
        <RevealSection
          v-for="(stat, i) in stats"
          :key="stat.label"
          animation="up"
          :delay="i * 100"
          class="text-center"
        >
          <p class="font-display text-3xl font-bold text-dm-gold sm:text-4xl">{{ stat.value }}</p>
          <p class="mt-1 text-sm text-dm-navy-200">{{ stat.label }}</p>
        </RevealSection>
      </div>
    </section>

    <!-- ── Nossa Missão ── -->
    <section class="bg-dm-navy-900 px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">
          <RevealSection animation="left">
            <h2 class="font-display text-3xl font-bold text-white sm:text-4xl">
              Quem somos nós?
            </h2>
            <p class="mt-4 leading-relaxed text-dm-navy-200">
              Somos Pedro e Geovana — um casal apaixonado por viagens que descobriu o poder das milhas
              e decidiu compartilhar esse conhecimento com o Brasil.
            </p>
            <p class="mt-4 leading-relaxed text-dm-navy-200">
              Já viajamos para mais de 40 destinos ao redor do mundo usando basicamente milhas e pontos
              acumulados no cotidiano. Hoje ensinamos exatamente como você pode fazer o mesmo,
              independentemente do seu salário.
            </p>
            <div class="mt-8">
              <AppButton @click="router.push({ name: 'course-list' })">
                Começar agora
              </AppButton>
            </div>
          </RevealSection>

          <RevealSection animation="right">
            <!-- Ícone decorativo da marca -->
            <div class="flex items-center justify-center rounded-3xl bg-dm-navy-800 p-12">
              <img src="/brand/icon-gold.png" alt="Dupla de Milheiros ícone" class="h-40 w-auto opacity-90 sm:h-52" />
            </div>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- ── Benefícios ── -->
    <section class="bg-dm-navy-800 px-4 py-20 sm:px-6 lg:px-8">
      <div class="mx-auto max-w-6xl">
        <RevealSection animation="up" class="mb-12 text-center">
          <h2 class="font-display text-3xl font-bold text-white sm:text-4xl">
            Por que estudar com a gente?
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-dm-navy-200">
            Conteúdo prático, direto ao ponto, criado por quem vive isso todos os dias.
          </p>
        </RevealSection>

        <div class="grid gap-6 sm:grid-cols-3">
          <RevealSection
            v-for="(b, i) in benefits"
            :key="b.title"
            animation="up"
            :delay="i * 100"
            class="rounded-2xl border border-dm-navy-700 bg-dm-navy-900 p-7"
          >
            <div class="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-dm-gold/10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-dm-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="b.icon" />
              </svg>
            </div>
            <h3 class="mb-2 font-display font-semibold text-white">{{ b.title }}</h3>
            <p class="text-sm leading-relaxed text-dm-navy-200">{{ b.desc }}</p>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- ── CTA final ── -->
    <section class="bg-dm-navy-900 px-4 py-24 sm:px-6 lg:px-8">
      <RevealSection animation="up" class="mx-auto max-w-2xl text-center">
        <img src="/brand/icon-gold.png" alt="" class="mx-auto mb-6 h-16 w-auto opacity-80" />
        <h2 class="font-display text-3xl font-bold text-white sm:text-4xl">
          Pronto para começar a voar?
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-dm-navy-200">
          Crie sua conta gratuitamente e explore os cursos disponíveis. Sua primeira viagem com milhas
          pode estar mais perto do que você imagina.
        </p>
        <div class="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <AppButton @click="router.push({ name: 'register' })">
            Criar conta grátis
          </AppButton>
          <AppButton variant="ghost" @click="router.push({ name: 'course-list' })">
            Ver cursos
          </AppButton>
        </div>
      </RevealSection>
    </section>

  </PageWrapper>
</template>
