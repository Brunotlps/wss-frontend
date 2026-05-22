import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth.js'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // Público
    {
      path: '/',
      name: 'course-list',
      component: () => import('@/views/courses/CourseListView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/about/AboutView.vue'),
    },
    {
      path: '/courses/:id',
      name: 'course-detail',
      component: () => import('@/views/courses/CourseDetailView.vue'),
    },

    // OAuth callbacks — sem guestOnly para não bloquear antes de processar os tokens
    {
      path: '/auth/callback',
      name: 'google-callback',
      component: () => import('@/views/auth/GoogleCallbackView.vue'),
      meta: { guestOnly: false, hideFooter: true },
    },
    {
      path: '/auth/error',
      name: 'auth-error',
      component: () => import('@/views/auth/GoogleCallbackView.vue'),
      meta: { guestOnly: false, hideFooter: true },
    },

    // Apenas visitantes (redireciona autenticados)
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: { guestOnly: true },
    },

    // Requer autenticação
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/learn/DashboardView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/checkout/:courseId',
      name: 'checkout',
      component: () => import('@/views/checkout/CheckoutView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/learn/:enrollmentId',
      name: 'player',
      component: () => import('@/views/learn/PlayerView.vue'),
      meta: { requiresAuth: true, hideFooter: true },
    },
    {
      path: '/certificates',
      name: 'certificates',
      component: () => import('@/views/certificates/CertificatesView.vue'),
      meta: { requiresAuth: true },
    },

    // 404
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    // Salva a rota de destino para redirecionar após o login
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'dashboard' }
  }
})

export default router
