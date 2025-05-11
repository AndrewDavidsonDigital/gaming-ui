<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { computed } from 'vue';
  import { routes } from '@/router'
import GameSwitcher from './GameSwitcher.vue';

  const currentRoute = useRoute();

  const routesStellaris = computed(() => routes.filter(el => el.game === 'Stellaris'));
  const routesCiv = computed(() => routes.filter(el => el.game === 'Civ-7'));

</script>

<template>
  <header class="h-fit bg-slate-900 sticky top-0 z-nav">
    <nav class="flex gap-x-4 justify-center">
      <GameSwitcher />
      <template
        v-for="(value, _index) in routesStellaris"
        :key="'routerKey_' + _index"
      >
        <RouterLink
          :to="value.path"
          class="truncate duration-500 hover:text-orange-400"
          :class="[
            { 'pointer-events-none cursor-default truncate !text-cyan-500' : value.path === currentRoute.path},
          ]"
          :title="value.title"
        >
          {{ value.title }}
        </RouterLink>
      </template>
      <template
        v-for="(value, _index) in routesCiv"
        :key="'routerKey_' + _index"
      >
        <RouterLink
          :to="value.path"
          class="truncate duration-500 hover:text-orange-400"
          :class="[
            { 'pointer-events-none cursor-default truncate !text-cyan-500' : value.path === currentRoute.path},
          ]"
          :title="value.title"
        >
          {{ value.title }}
        </RouterLink>
      </template>
    </nav>
  </header>
</template>
