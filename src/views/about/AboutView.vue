<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const photos = [
  '/images/image1.jpeg',
  '/images/image2.jpeg',
]

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

onUnmounted(() => {
  clearInterval(autoplayTimer)
})

const benefits = [
  {
    icon: '✈️',
    title: 'Milhas Aéreas',
    description: 'Aprenda a acumular milhas de forma estratégica e use-as para voar para qualquer destino gastando muito menos.',
  },
  {
    icon: '💳',
    title: 'Cartões de Crédito',
    description: 'Descubra os melhores cartões para acumular pontos no dia a dia e as estratégias para maximizar cada gasto.',
  },
  {
    icon: '🔄',
    title: 'Transferência de Pontos',
    description: 'Domine a arte de mover pontos entre programas de fidelidade para obter o maior valor possível.',
  },
  {
    icon: '🏨',
    title: 'Hotéis e Hospedagem',
    description: 'Use milhas e pontos para se hospedar em hotéis incríveis — do econômico ao luxo — pagando muito menos.',
  },
  {
    icon: '🚗',
    title: 'Mobilidade Urbana',
    description: 'Aproveite seus pontos no Uber, táxi e aluguel de carro. Milhas que vão além das passagens aéreas.',
  },
  {
    icon: '💰',
    title: 'Vida Financeira',
    description: 'Educação financeira aplicada: entenda como organizar seu dinheiro enquanto acumula benefícios reais.',
  },
]

const steps = [
  {
    number: '01',
    title: 'Escolha o Curso',
    description: 'Explore nosso catálogo e encontre o curso que vai transformar a sua relação com milhas e finanças.',
  },
  {
    number: '02',
    title: 'Aprenda no Seu Ritmo',
    description: 'Assista às aulas em vídeo quando e onde quiser. Seu progresso fica salvo automaticamente.',
  },
  {
    number: '03',
    title: 'Economize e Viaje',
    description: 'Coloque em prática o que aprendeu e comece a transformar pontos em passagens e experiências inesquecíveis.',
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
  <!-- ══════════════════════════════════════════════
       HERO
  ══════════════════════════════════════════════ -->
  <section class="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
    <!-- Decoração de fundo -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <div class="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-gold-500/10 blur-3xl" />
      <div class="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-navy-700/60 blur-2xl" />
      <!-- Grid pattern sutil -->
      <div
        class="absolute inset-0 opacity-5"
        style="background-image: radial-gradient(circle, #ffd942 1px, transparent 1px); background-size: 32px 32px;"
      />
    </div>

    <div class="relative mx-auto max-w-4xl px-4 text-center">
      <!-- Badge -->
      <div class="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-500/10 px-4 py-1.5 text-sm font-medium text-gold-400">
        <span>✈️</span>
        <span>A plataforma das milhas aéreas</span>
      </div>

      <h1 class="text-4xl font-bold leading-tight tracking-tight text-cream-50 sm:text-5xl lg:text-6xl">
        Aprenda a Viajar o Mundo<br />
        <span class="text-gold-500">com Milhas Aéreas</span>
      </h1>

      <p class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-navy-200">
        Pedro e Geovana, a Dupla de Milheiros, revelam as estratégias que usam para transformar pontos do dia a dia em passagens aéreas, hospedagens e experiências inesquecíveis — gastando muito menos.
      </p>

      <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          class="w-full rounded-lg bg-gold-500 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-lg transition-all hover:bg-gold-400 hover:shadow-gold-500/25 sm:w-auto"
          @click="router.push({ name: 'course-list' })"
        >
          Explorar Cursos
        </button>
        <a
          href="#quem-somos"
          class="w-full rounded-lg border border-navy-600 px-8 py-3.5 text-base font-semibold text-cream-50 transition-all hover:border-gold-500/50 hover:text-gold-400 sm:w-auto"
        >
          Conhecer a Dupla ↓
        </a>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════
       STATS BAR
  ══════════════════════════════════════════════ -->
  <section class="border-y border-cream-200 bg-white py-10 dark:border-navy-700 dark:bg-navy-800">
    <div class="mx-auto max-w-4xl px-4">
      <div class="grid grid-cols-3 gap-6 text-center">
        <div>
          <p class="text-3xl font-bold text-navy-900 dark:text-gold-400">500+</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-navy-300">Alunos Transformados</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-navy-900 dark:text-gold-400">15+</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-navy-300">Cursos Disponíveis</p>
        </div>
        <div>
          <p class="text-3xl font-bold text-navy-900 dark:text-gold-400">4.9★</p>
          <p class="mt-1 text-sm text-gray-500 dark:text-navy-300">Avaliação Média</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════
       QUEM SOMOS
  ══════════════════════════════════════════════ -->
  <section id="quem-somos" class="bg-cream-100 py-20 dark:bg-navy-900">
    <div class="mx-auto max-w-6xl px-4">
      <div class="grid items-center gap-12 lg:grid-cols-2">

        <!-- Carrossel de fotos -->
        <div class="relative">
          <div class="relative aspect-square max-w-md mx-auto overflow-hidden rounded-2xl shadow-2xl bg-navy-800">
            <!-- Fotos -->
            <TransitionGroup name="carousel">
              <img
                v-for="(photo, index) in photos"
                v-show="activePhoto === index"
                :key="photo"
                :src="photo"
                alt="Dupla de Milheiros"
                class="absolute inset-0 h-full w-full object-cover"
              />
            </TransitionGroup>

            <!-- Controles prev/next (só aparecem se houver mais de 1 foto) -->
            <template v-if="photos.length > 1">
              <button
                class="absolute left-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900/60 text-white backdrop-blur-sm transition-colors hover:bg-navy-900/80"
                aria-label="Foto anterior"
                @click="prevPhoto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                class="absolute right-3 top-1/2 -translate-y-1/2 flex h-9 w-9 items-center justify-center rounded-full bg-navy-900/60 text-white backdrop-blur-sm transition-colors hover:bg-navy-900/80"
                aria-label="Próxima foto"
                @click="nextPhoto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>

              <!-- Dots -->
              <div class="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                <button
                  v-for="(_, index) in photos"
                  :key="index"
                  class="h-1.5 rounded-full transition-all"
                  :class="activePhoto === index ? 'w-5 bg-gold-500' : 'w-1.5 bg-white/50 hover:bg-white/80'"
                  :aria-label="`Ir para foto ${index + 1}`"
                  @click="goToPhoto(index)"
                />
              </div>
            </template>
          </div>

          <!-- Decoração -->
          <div class="absolute -bottom-4 -right-4 h-32 w-32 rounded-2xl bg-gold-500/20 -z-10" />
          <div class="absolute -top-4 -left-4 h-24 w-24 rounded-2xl bg-navy-900/10 dark:bg-navy-700/50 -z-10" />
        </div>

        <!-- Texto -->
        <div>
          <span class="text-sm font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-500">
            Quem somos
          </span>
          <h2 class="mt-3 text-3xl font-bold text-navy-900 dark:text-cream-50 sm:text-4xl">
            De curiosos a especialistas em milhas
          </h2>
          <div class="mt-6 space-y-4 text-base leading-relaxed text-gray-600 dark:text-navy-200">
            <p>
              Você já imaginou explorar o mundo sem gastar uma fortuna? Viajar para destinos paradisíacos com passagens gratuitas, se hospedar em Paris pagando quase nada, ou economizar no Uber enquanto conhece Nova York?
            </p>
            <p>
              Somos Pedro e Geovana, a <strong class="text-navy-900 dark:text-gold-400">Dupla de Milheiros</strong>, e estamos aqui para mostrar que tudo isso é possível com milhas. Viajar barato não é sorte — é estratégia.
            </p>
            <p>
              O que começou como uma curiosidade se transformou em nossa maior paixão. Depois de conhecer lugares incríveis graças às milhas, decidimos compartilhar esse conhecimento com quem também deseja viver essa experiência.
            </p>
          </div>
          <button
            class="mt-8 rounded-lg bg-gold-500 px-6 py-3 text-sm font-semibold text-navy-900 transition-colors hover:bg-gold-400"
            @click="router.push({ name: 'course-list' })"
          >
            Ver nossos cursos →
          </button>
        </div>

      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════
       O QUE VOCÊ VAI APRENDER
  ══════════════════════════════════════════════ -->
  <section class="bg-white py-20 dark:bg-navy-800">
    <div class="mx-auto max-w-6xl px-4">
      <div class="mb-12 text-center">
        <span class="text-sm font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-500">
          Conteúdo
        </span>
        <h2 class="mt-3 text-3xl font-bold text-navy-900 dark:text-cream-50 sm:text-4xl">
          O que você vai aprender
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-gray-500 dark:text-navy-300">
          Desde o básico até estratégias avançadas — tudo que você precisa para dominar o universo das milhas e da vida financeira.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="benefit in benefits"
          :key="benefit.title"
          class="group rounded-xl border border-cream-200 bg-cream-50 p-6 transition-all hover:border-gold-500/50 hover:shadow-md dark:border-navy-700 dark:bg-navy-900"
        >
          <div class="mb-4 text-3xl">{{ benefit.icon }}</div>
          <h3 class="mb-2 font-semibold text-navy-900 dark:text-cream-50">{{ benefit.title }}</h3>
          <p class="text-sm leading-relaxed text-gray-500 dark:text-navy-300">{{ benefit.description }}</p>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════
       COMO FUNCIONA
  ══════════════════════════════════════════════ -->
  <section class="bg-navy-900 py-20">
    <div class="mx-auto max-w-6xl px-4">
      <div class="mb-12 text-center">
        <span class="text-sm font-semibold uppercase tracking-wider text-gold-500">
          Processo
        </span>
        <h2 class="mt-3 text-3xl font-bold text-cream-50 sm:text-4xl">
          Como funciona
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-navy-200">
          Em três passos simples você começa a transformar pontos em experiências inesquecíveis.
        </p>
      </div>

      <div class="grid gap-8 md:grid-cols-3">
        <div
          v-for="step in steps"
          :key="step.number"
          class="relative rounded-2xl border border-navy-700 bg-navy-800 p-8 text-center"
        >
          <div class="mb-4 inline-block text-5xl font-black text-gold-500/20 leading-none">
            {{ step.number }}
          </div>
          <h3 class="mb-3 text-lg font-bold text-cream-50">{{ step.title }}</h3>
          <p class="text-sm leading-relaxed text-navy-200">{{ step.description }}</p>
        </div>
      </div>

      <div class="mt-12 text-center">
        <button
          class="rounded-lg bg-gold-500 px-8 py-3.5 text-base font-semibold text-navy-900 transition-colors hover:bg-gold-400"
          @click="router.push({ name: 'course-list' })"
        >
          Começar agora
        </button>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════
       FAQ
  ══════════════════════════════════════════════ -->
  <section class="bg-cream-100 py-20 dark:bg-navy-900">
    <div class="mx-auto max-w-3xl px-4">
      <div class="mb-12 text-center">
        <span class="text-sm font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-500">
          Dúvidas
        </span>
        <h2 class="mt-3 text-3xl font-bold text-navy-900 dark:text-cream-50 sm:text-4xl">
          Perguntas frequentes
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-gray-500 dark:text-navy-300">
          Tudo o que você precisa saber antes de começar sua jornada com milhas.
        </p>
      </div>

      <div class="space-y-3">
        <div
          v-for="(faq, index) in faqs"
          :key="index"
          class="overflow-hidden rounded-xl border border-cream-200 bg-white dark:border-navy-700 dark:bg-navy-800"
        >
          <button
            class="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
            @click="toggleFaq(index)"
          >
            <span class="font-medium text-navy-900 dark:text-cream-50">{{ faq.question }}</span>
            <span
              class="flex-shrink-0 flex h-6 w-6 items-center justify-center rounded-full border border-cream-200 text-gray-400 transition-transform dark:border-navy-600 dark:text-navy-300"
              :class="faq.open ? 'rotate-45 border-gold-500 text-gold-500 dark:border-gold-500 dark:text-gold-500' : ''"
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
            <div v-if="faq.open" class="border-t border-cream-200 px-6 py-4 dark:border-navy-700">
              <p class="text-sm leading-relaxed text-gray-600 dark:text-navy-200">{{ faq.answer }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>

  <!-- ══════════════════════════════════════════════
       CTA FINAL
  ══════════════════════════════════════════════ -->
  <section class="relative overflow-hidden bg-navy-900 py-24">
    <!-- Decoração -->
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute right-0 top-0 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
      <div class="absolute bottom-0 left-0 h-60 w-60 rounded-full bg-navy-700/60 blur-2xl" />
    </div>

    <div class="relative mx-auto max-w-3xl px-4 text-center">
      <span class="text-4xl">✈️</span>
      <h2 class="mt-4 text-3xl font-bold text-cream-50 sm:text-4xl">
        Pronto para começar sua<br />
        <span class="text-gold-500">jornada com milhas?</span>
      </h2>
      <p class="mx-auto mt-4 max-w-xl text-navy-200">
        Junte-se a centenas de alunos que já transformaram a forma de viajar. Comece hoje mesmo, no seu ritmo, de onde quiser.
      </p>

      <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <button
          class="w-full rounded-lg bg-gold-500 px-8 py-3.5 text-base font-semibold text-navy-900 shadow-lg transition-all hover:bg-gold-400 sm:w-auto"
          @click="router.push({ name: 'register' })"
        >
          Criar Conta Grátis
        </button>
        <button
          class="w-full rounded-lg border border-navy-600 px-8 py-3.5 text-base font-semibold text-cream-50 transition-all hover:border-gold-500/50 hover:text-gold-400 sm:w-auto"
          @click="router.push({ name: 'course-list' })"
        >
          Ver Todos os Cursos
        </button>
      </div>
    </div>
  </section>
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
