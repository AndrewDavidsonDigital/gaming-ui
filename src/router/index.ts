import { createRouter, createWebHistory, type RouteLocationNormalizedLoaded } from 'vue-router'
import type { GameType, IRoute } from '@/lib/interfaces';

import Landing from '@/views/Landing.vue'

import Civ7MainMenu from '@/views/Civ-7/MainMenu.vue';
import Civ7Loading from '@/views/Civ-7/Loading.vue';
import Civ7InGameUI from '@/views/Civ-7/InGameUI.vue';

import StellarisMainMenu from '@/views/Stellaris/MainMenu.vue';
import StellarisLoading from '@/views/Stellaris/Loading.vue';
import StellarisInGameUI from '@/views/Stellaris/InGameUI.vue';

export const routes: IRoute[] = [
  {
    path: '/',
    name: 'home',
    component: Landing
  },


  {
    path: '/civ-7/main-menu',
    name: 'main-menu-civ7',
    title: "Main Menu",
    game: 'Civ-7',
    component: Civ7MainMenu
  },
  {
    path: '/civ-7/loading',
    name: 'loading-civ7',
    title: "Loading",
    game: 'Civ-7',
    component: Civ7Loading
  },
  {
    path: '/civ-7/ingame-ui',
    name: 'ingame-ui-civ7',
    title: "In Game UI",
    game: 'Civ-7',
    component: Civ7InGameUI
  },


  {
    path: '/stellaris/main-menu',
    name: 'main-menu-stellaris',
    title: "Main Menu",
    game: 'Stellaris',
    component: StellarisMainMenu
  },
  {
    path: '/stellaris/loading',
    name: 'loading-stellaris',
    title: "Loading",
    game: 'Stellaris',
    component: StellarisLoading
  },
  {
    path: '/stellaris/ingame-ui',
    name: 'ingame-ui-stellaris',
    title: "In Game UI",
    game: 'Stellaris',
    component: StellarisInGameUI
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;

export function resolveGameFromRoute(route: IRoute | RouteLocationNormalizedLoaded): GameType{
  return routes.find(el => el.name === route.name)?.game || 'Civ-7';
}