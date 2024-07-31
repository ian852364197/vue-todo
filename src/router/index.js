import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'page',
      component: () => import('@/views/pages/01PageView.vue')
    },
    {
      path: '/you/cant/see/me',
      name: 'layout',
      component: () => import('@/views/LayoutView.vue'),
      children: [
        {
          path: '',
          name: 'home',
          component: () => import('@/views/pages/00HomeView.vue')
        }
      ]
    }
  ]
});

export default router;
