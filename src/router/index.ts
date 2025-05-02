import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../views/Landing.vue'
import MainMenu from '@/views/MainMenu.vue';
import Loading from '@/views/Loading.vue';
import InGameUI from '@/views/InGameUI.vue';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: Landing
  },
  {
    path: '/main-menu',
    name: 'main-menu',
    title: "Main Menu",
    component: MainMenu
  },
  {
    path: '/loading',
    name: 'loading',
    title: "Loading",
    component: Loading
  },
  {
    path: '/ingame-ui',
    name: 'ingame-ui',
    title: "In Game UI",
    component: InGameUI
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

