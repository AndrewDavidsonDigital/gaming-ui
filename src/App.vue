<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Navigation from '@/components/Navigation.vue';
  import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
  import { useDebounce } from './lib/debounce';

  const { debounce } = useDebounce();

  const BASE_FONT_SIZE = 16;
  const remSize = ref<number>();


  onMounted(() => {
    updateScale();
    window.addEventListener('resize', () => debounce(() => updateScale()));
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => debounce(() => updateScale()));
  });

  const scale = computed(() =>  (remSize.value || 1) / BASE_FONT_SIZE);

  function updateScale(){
    remSize.value = Number(window.getComputedStyle(document.body).fontSize.split('px')[0]);
  }

</script>

<template>
  <main
    class="bg-slate-800 text-green-500 min-h-screen min-w-full pb-5"
    :style="`--dynamic-scale: ${scale};`"
  >
    <Navigation />
    <RouterView />
  </main>
</template>
