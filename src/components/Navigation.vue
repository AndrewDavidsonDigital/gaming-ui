<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import { resolveRouteName } from "./Navigation.ts"
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue';
import { routes } from '@/router'

const currentRoute = useRoute();

const isMenuOpen = ref<boolean>(false);

watch(isMenuOpen, (newVal) => {
  if (newVal){
    document.body.classList.add('overflow-clip');
  } else {
    document.body.classList.remove('overflow-clip');
  }
})

</script>

<template>
  <header class="h-fit  bg-slate-900">
    <nav class="flex gap-x-4 justify-center">
      <template
        v-for="(value, _index) in routes"
        :key="'routerKey_' + _index"
      >
        <RouterLink
          :to="value.path"
          class="truncate duration-500 hover:text-orange-400"
          :class="[
            { 'pointer-events-none cursor-default truncate !text-cyan-500' : value.path === currentRoute.path},
          ]"
          :title="value.title"
          @click="isMenuOpen = false"
        >
          {{ value.title }}
        </RouterLink>
      </template>
    </nav>
  </header>
</template>
