<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import AppButton from '@/components/ui/AppButton.vue'
import RevealSection from '@/components/ui/RevealSection.vue'
import PageWrapper from '@/components/layout/PageWrapper.vue'

const router = useRouter()

// ── Carrossel ──────────────────────────────────────────
const photos = ['/images/image1.jpeg', '/images/image2.jpeg']
const activePhoto = ref(0)
let autoplayTimer = null

function prevPhoto() {
  activePhoto.value = (activePhoto.value - 1 + photos.length) % photos.length
  restartAutoplay()
}
function nextPhoto() {
  activePhoto.value = (activePhoto.value + 1) % photos.length
  restartAutoplay()
}
function goToPhoto(index) {
  activePhoto.value = index
  restartAutoplay()
}
function restartAutoplay() {
  clearInterval(autoplayTimer)
  autoplayTimer = setInterval(nextPhoto, 4000)
}
onMounted(() => {
  if (photos.length > 1) autoplayTimer = setInterval(nextPhoto, 4000)
})
onUnmounted(() => clearInterval(autoplayTimer))

// ── Conteúdo ───────────────────────────────────────────
const learnings = [
  {
    icon: '✈️',
    title: 'Milhas Aéreas',
    desc: 'Aprenda a acumular milhas de forma estratégica e use-as para voar para qualquer destino gastando muito menos.',
  },
  {
    icon: '💳',
    title: 'Cartões de Crédito',
    desc: 'Descubra os melhores cartões para acumular pontos no dia a dia e as estratégias para maximizar cada gasto.',
  },
  {
    icon: '🔄',
    title: 'Transferência de Pontos',
    desc: 'Domine a arte de mover pontos entre programas de fidelidade para obter o maior valor possível.',
  },
  {
    icon: '🏨',
    title: 'Hotéis e Hospedagem',
    desc: 'Use milhas e pontos para se hospedar em hotéis incríveis — do econômico ao luxo — pagando muito menos.',
  },
  {
    icon: '🚗',
    title: 'Mobilidade Urbana',
    desc: 'Aproveite seus pontos no Uber, táxi e aluguel de carro. Milhas que vão além das passagens aéreas.',
  },
  {
    icon: '💰',
    title: 'Vida Financeira',
    desc: 'Educação financeira aplicada: entenda como organizar seu dinheiro enquanto acumula benefícios reais.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Escolha o Curso',
    desc: 'Explore nosso catálogo e encontre o curso que vai transformar a sua relação com milhas e finanças.',
  },
  {
    number: '02',
    title: 'Aprenda no Seu Ritmo',
    desc: 'Assista às aulas em vídeo quando e onde quiser. Seu progresso fica salvo automaticamente.',
  },
  {
    number: '03',
    title: 'Economize e Viaje',
    desc: 'Coloque em prática o que aprendeu e comece a transformar pontos em passagens e experiências inesquecíveis.',
  },
]

const faqs = ref([
  {
    question: 'O que são milhas aéreas e como funcionam?',
    answer: 'Milhas aéreas são pontos acumulados em programas de fidelidade de companhias aéreas e cartões de crédito. A cada compra ou voo realizado, você acumula pontos que podem ser trocados por passagens, upgrades, hospedagem e muito mais. Nos nossos cursos, você aprende exatamente como fazer isso de forma estratégica.',
    open: false,
  },
  {
    question: 'Preciso viajar muito para o mundo das milhas valer a pena?',
    answer: 'Não! A maioria das milhas é acumulada no dia a dia — supermercado, restaurantes, streaming, conta de energia. Você não precisa viajar para acumular. Nos nossos cursos mostramos como usar seus gastos cotidianos para acumular pontos e, aí sim, trocar por viagens.',
    open: false,
  },
  {
    question: 'Quais cartões de crédito são mais recomendados?',
    answer: 'Depende do seu perfil de gastos e do programa de fidelidade que você quer usar. No curso de cartões de crédito, analisamos as principais opções do mercado e ajudamos você a escolher os melhores para a sua realidade — sem precisar gastar mais do que o necessário.',
    open: false,
  },
  {
    question: 'Como funciona a transferência de pontos entre programas?',
    answer: 'Muitos programas de pontos permitem transferir para companhias aéreas parceiras, geralmente com bônus de transferência em datas especiais. Aprendemos a identificar quando vale a pena transferir, quais parceiros oferecem o melhor custo-benefício e como evitar as armadilhas mais comuns.',
    open: false,
  },
  {
    question: 'Os cursos têm prazo de validade após a compra?',
    answer: 'Não! Uma vez matriculado, você tem acesso vitalício ao curso e a todas as atualizações futuras. Assista no seu ritmo, volte quantas vezes quiser e acompanhe as novidades do mundo das milhas sem custo adicional.',
    open: false,
  },
  {
    question: 'Recebo certificado ao concluir o curso?',
    answer: 'Sim! Ao completar todas as aulas, você recebe automaticamente um certificado digital de conclusão. O certificado fica disponível para download no seu painel a qualquer momento.',
    open: false,
  },
  {
    question: 'Posso assistir pelo celular ou tablet?',
    answer: 'Sim! A plataforma é totalmente responsiva e funciona em qualquer dispositivo — celular, tablet, notebook ou computador. Assista onde e como preferir.',
    open: false,
  },
  {
    question: 'Como o pagamento é processado?',
    answer: 'Utilizamos o Stripe, uma das plataformas de pagamento mais seguras do mundo. Aceitamos os principais cartões de crédito. Toda a transação é criptografada e seus dados nunca são armazenados em nossos servidores.',
    open: false,
  },
])

function toggleFaq(index) {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<template>
  <PageWrapper :full="true">

    <!-- ── Hero ── -->
    <section class="hero-glow relative overflow-hidden bg-white px-4 py-24 sm:px-6 sm:py-32 lg:px-8 dark:bg-dm-navy-900">
      <div class="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div class="h-[600px] w-[600px] rounded-full bg-dm-blue opacity-5 blur-[140px] dark:opacity-10" />
      </div>
      <div
        class="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style="background-image: radial-gradient(circle, #ffd942 1px, transparent 1px); background-size: 32px 32px"
      />

      <div class="relative mx-auto max-w-4xl text-center">
        <RevealSection animation="up">
          <img
            src="/brand/logo-dark.png"
            alt="Dupla de Milheiros"
            class="mx-auto mb-8 h-16 w-auto object-contain sm:h-20"
            style="max-width: 220px"
          />
        </RevealSection>

        <RevealSection animation="up" :delay="100">
          <div class="mb-5 inline-flex items-center gap-2 rounded-full border border-dm-gold/40 bg-dm-gold/10 px-4 py-1.5 text-sm font-medium text-dm-gold">
            <span>✈️</span>
            <span>A plataforma das milhas aéreas</span>
          </div>
          <h1 class="font-display text-4xl font-bold leading-tight text-dm-navy-900 sm:text-5xl lg:text-6xl dark:text-white">
            Voe mais longe com<br />
            <span class="text-dm-gold">os seus pontos</span>
          </h1>
        </RevealSection>

        <RevealSection animation="up" :delay="200">
          <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-dm-navy-200">
            Aprenda a acumular milhas, escolher os melhores cartões e transformar gastos do dia a dia
            em viagens inesquecíveis — com quem já fez isso de verdade.
          </p>
        </RevealSection>

        <RevealSection animation="up" :delay="300">
          <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <AppButton @click="router.push({ name: 'course-list' })">
              Explorar cursos
            </AppButton>
            <AppButton variant="secondary" @click="router.push({ name: 'register' })">
              Criar conta grátis
            </AppButton>
          </div>
        </RevealSection>
      </div>
    </section>

    <!-- ── Divider ── -->
    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- ── Quem somos ── -->
    <section class="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-6xl">
        <div class="grid items-center gap-12 lg:grid-cols-2">

          <!-- Carrossel -->
          <RevealSection animation="left">
            <div class="relative mx-auto max-w-md">
              <div class="relative overflow-hidden rounded-2xl bg-dm-navy-800 shadow-2xl shadow-black/30" style="aspect-ratio: 3/4">
                <TransitionGroup name="carousel">
                  <img
                    v-for="(photo, index) in photos"
                    v-show="activePhoto === index"
                    :key="photo"
                    :src="photo"
                    alt="Dupla de Milheiros"
                    class="absolute inset-0 h-full w-full object-contain"
                  />
                </TransitionGroup>

                <template v-if="photos.length > 1">
                  <button
                    class="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                    aria-label="Foto anterior"
                    @click="prevPhoto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    class="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                    aria-label="Próxima foto"
                    @click="nextPhoto"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                    <button
                      v-for="(_, index) in photos"
                      :key="index"
                      class="h-1.5 rounded-full transition-all"
                      :class="activePhoto === index ? 'w-5 bg-dm-gold' : 'w-1.5 bg-white/50 hover:bg-white/80'"
                      :aria-label="`Ir para foto ${index + 1}`"
                      @click="goToPhoto(index)"
                    />
                  </div>
                </template>
              </div>
              <!-- Decoração -->
              <div class="absolute -bottom-3 -right-3 -z-10 h-28 w-28 rounded-2xl bg-dm-gold/15" />
              <div class="absolute -left-3 -top-3 -z-10 h-20 w-20 rounded-2xl bg-dm-navy-700/40 dark:bg-white/5" />
            </div>
          </RevealSection>

          <!-- Texto -->
          <RevealSection animation="right">
            <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-dm-gold">Quem somos</p>
            <h2 class="font-display text-3xl font-bold text-dm-navy-900 sm:text-4xl dark:text-white">
              De curiosos a especialistas em milhas
            </h2>
            <div class="mt-5 space-y-4 leading-relaxed text-slate-600 dark:text-dm-navy-200">
              <p>
                Você já imaginou explorar o mundo sem gastar uma fortuna? Viajar para destinos paradisíacos
                com passagens gratuitas, se hospedar em Paris pagando quase nada, ou economizar no Uber
                enquanto conhece Nova York?
              </p>
              <p>
                Somos Pedro e Geovana, a <strong class="font-semibold text-dm-navy-900 dark:text-dm-gold">Dupla de Milheiros</strong>,
                e estamos aqui para mostrar que tudo isso é possível com milhas. Viajar barato não é sorte — é estratégia.
              </p>
              <p>
                O que começou como uma curiosidade se transformou em nossa maior paixão. Depois de conhecer
                lugares incríveis graças às milhas, decidimos compartilhar esse conhecimento com quem também
                deseja viver essa experiência.
              </p>
            </div>
            <div class="mt-8">
              <AppButton @click="router.push({ name: 'course-list' })">
                Ver nossos cursos
              </AppButton>
            </div>
          </RevealSection>

        </div>
      </div>
    </section>

    <!-- ── Divider ── -->
    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- ── O que você vai aprender ── -->
    <section class="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-6xl">
        <RevealSection animation="up" class="mb-12 text-center">
          <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-dm-gold">Conteúdo</p>
          <h2 class="font-display text-3xl font-bold text-dm-navy-900 sm:text-4xl dark:text-white">
            O que você vai aprender
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-slate-500 dark:text-dm-navy-200">
            Desde o básico até estratégias avançadas — tudo que você precisa para dominar o universo das milhas e da vida financeira.
          </p>
        </RevealSection>

        <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <RevealSection
            v-for="(item, i) in learnings"
            :key="item.title"
            animation="up"
            :delay="(i % 3) * 80"
            class="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-dm-gold/40 hover:shadow-md dark:border-white/8 dark:bg-white/3 dark:hover:border-dm-gold/30"
          >
            <div class="mb-4 text-3xl">{{ item.icon }}</div>
            <h3 class="mb-2 font-display font-semibold text-dm-navy-900 dark:text-white">{{ item.title }}</h3>
            <p class="text-sm leading-relaxed text-slate-500 dark:text-dm-navy-200">{{ item.desc }}</p>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- ── Divider ── -->
    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- ── Como funciona ── -->
    <section class="bg-white px-4 py-20 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-5xl">
        <RevealSection animation="up" class="mb-14 text-center">
          <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-dm-gold">Processo</p>
          <h2 class="font-display text-3xl font-bold text-dm-navy-900 sm:text-4xl dark:text-white">
            Como funciona
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-slate-500 dark:text-dm-navy-200">
            Em três passos simples você começa a transformar pontos em experiências inesquecíveis.
          </p>
        </RevealSection>

        <div class="grid gap-6 md:grid-cols-3">
          <RevealSection
            v-for="(step, i) in steps"
            :key="step.number"
            animation="up"
            :delay="i * 100"
            class="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center dark:border-white/8 dark:bg-white/3"
          >
            <p class="font-display text-5xl font-black leading-none text-dm-gold/25">{{ step.number }}</p>
            <h3 class="mt-4 font-display text-lg font-bold text-dm-navy-900 dark:text-white">{{ step.title }}</h3>
            <p class="mt-2 text-sm leading-relaxed text-slate-500 dark:text-dm-navy-200">{{ step.desc }}</p>
          </RevealSection>
        </div>

        <RevealSection animation="up" :delay="300" class="mt-12 text-center">
          <AppButton @click="router.push({ name: 'course-list' })">
            Começar agora
          </AppButton>
        </RevealSection>
      </div>
    </section>

    <!-- ── Divider ── -->
    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- ── FAQ ── -->
    <section class="bg-slate-50 px-4 py-20 sm:px-6 lg:px-8 dark:bg-dm-navy-900">
      <div class="mx-auto max-w-3xl">
        <RevealSection animation="up" class="mb-12 text-center">
          <p class="mb-3 text-xs font-semibold uppercase tracking-widest text-dm-gold">Dúvidas</p>
          <h2 class="font-display text-3xl font-bold text-dm-navy-900 sm:text-4xl dark:text-white">
            Perguntas frequentes
          </h2>
          <p class="mx-auto mt-3 max-w-xl text-slate-500 dark:text-dm-navy-200">
            Tudo o que você precisa saber antes de começar sua jornada com milhas.
          </p>
        </RevealSection>

        <div class="space-y-3">
          <RevealSection
            v-for="(faq, index) in faqs"
            :key="index"
            animation="up"
            :delay="index * 40"
          >
            <div class="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-white/8 dark:bg-white/3">
              <button
                class="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:text-dm-gold dark:hover:text-dm-gold"
                @click="toggleFaq(index)"
              >
                <span class="font-medium text-dm-navy-900 dark:text-white">{{ faq.question }}</span>
                <span
                  class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-all"
                  :class="faq.open
                    ? 'rotate-45 border-dm-gold text-dm-gold'
                    : 'border-slate-300 text-slate-400 dark:border-white/20 dark:text-dm-navy-300'"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>

              <Transition
                enter-active-class="transition-all duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition-all duration-150 ease-in"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="faq.open" class="border-t border-slate-100 px-5 pb-5 pt-4 dark:border-white/8">
                  <p class="text-sm leading-relaxed text-slate-600 dark:text-dm-navy-200">{{ faq.answer }}</p>
                </div>
              </Transition>
            </div>
          </RevealSection>
        </div>
      </div>
    </section>

    <!-- ── Divider ── -->
    <div class="h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-dm-gold/20" />

    <!-- ── CTA final ── -->
    <section class="relative overflow-hidden bg-dm-navy-900 px-4 py-24 sm:px-6 lg:px-8">
      <div class="pointer-events-none absolute inset-0">
        <div class="absolute right-0 top-0 h-80 w-80 rounded-full bg-dm-gold/8 blur-3xl" />
        <div class="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-dm-navy-800/60 blur-2xl" />
      </div>

      <RevealSection animation="up" class="relative mx-auto max-w-2xl text-center">
        <span class="text-4xl">✈️</span>
        <h2 class="mt-4 font-display text-3xl font-bold text-white sm:text-4xl">
          Pronto para começar sua<br />
          <span class="text-dm-gold">jornada com milhas?</span>
        </h2>
        <p class="mx-auto mt-4 max-w-lg text-dm-navy-200">
          Junte-se a centenas de alunos que já transformaram a forma de viajar. Comece hoje mesmo, no seu ritmo, de onde quiser.
        </p>
        <div class="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <AppButton @click="router.push({ name: 'register' })">
            Criar conta grátis
          </AppButton>
          <AppButton variant="secondary" @click="router.push({ name: 'course-list' })">
            Ver todos os cursos
          </AppButton>
        </div>
      </RevealSection>
    </section>

  </PageWrapper>
</template>

<style scoped>
.carousel-enter-active,
.carousel-leave-active {
  transition: opacity 0.6s ease;
}
.carousel-enter-from,
.carousel-leave-to {
  opacity: 0;
}
</style>
