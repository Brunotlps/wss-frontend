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
      path: '/courses/:id',
      name: 'course-detail',
      component: () => import('@/views/courses/CourseDetailView.vue'),
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
      meta: { requiresAuth: true },
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
