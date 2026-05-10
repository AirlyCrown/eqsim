import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/components/pages/Home.vue'),
    },
    {
      path: '/weapons',
      name: 'weapons',
      component: () => import('@/components/pages/weapons/Weapons.vue'),
    },
    {
      path: '/units',
      name: 'units',
      component: () => import('@/components/pages/units/Units.vue'),
    },
    {
      path: '/rings',
      name: 'rings',
      component: () => import('@/components/pages/rings/Rings.vue'),
    },
    {
      path: '/character',
      name: 'character',
      component: () => import('@/components/pages/character/Character.vue'),
    },
    {
      path: '/data',
      name: 'data',
      component: () => import('@/components/pages/data/Data.vue'),
    },
    {
      path: '/howtouse',
      name: 'howtouse',
      component: () => import('@/components/pages/howtouse/HowtoUse.vue'),
    },
  ],
})

export default router
