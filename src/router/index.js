import { createRouter, createWebHistory } from 'vue-router';

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'main',
      component: () => import('@/views/CurrencyList.vue'),
    },

    {
      path: '/converter',
      name: 'converter',
      component: () => import('@/views/CurrencyConverter.vue'),
    },
  ],
});
