import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

const routes = [
  { path: '/', name: 'home', component: HomeView },
  // { path: '/black-chefs', name: 'blackChefs', component: () => import('@/views/BlackChefs.vue') },
  // { path: '/white-chefs', name: 'whiteChefs', component: () => import('@/views/WhiteChefs.vue') },
  // { path: '/judges', name: 'judges', component: () => import('@/views/Judges.vue') },
  // { path: '/crew', name: 'crew', component: () => import('@/views/Crew.vue') },
  { path: '/vote', name: 'vote', component: () => import('@/views/VoteView.vue') },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
