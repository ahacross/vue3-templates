import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/about',
      name: 'About',
      meta: { layout: 'empty' },
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'Admin',
      component: () => import('../views/AdminView.vue')
    }
  ]
})

export default router
