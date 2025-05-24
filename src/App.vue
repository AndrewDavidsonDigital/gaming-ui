<script setup lang="ts">
  import { RouterView, useRoute } from 'vue-router';
  import Navigation from '@/components/Navigation.vue';
  import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue';
  import { useDebounce } from './lib/debounce';
  import AudioEngine from './components/AudioEngine.vue';
  import { resolveGameFromRoute } from './router';
  import { useBgmEngine } from './stores/audio';
  import bgmStellaris from '@/assets/audio/Stellaris/20_fasterthanlight_instrumental.mp3';
  import bgmCiv7 from '@/assets/audio/Civ-7/Sogno_di_Volare_-_The_Dream_of_Flight_(Civilization_6_OST).mp3';
import type { GameType } from './lib/interfaces';

  const currentRoute = useRoute();
  const bgmEngine = useBgmEngine();
  const { debounce } = useDebounce();

  const BASE_FONT_SIZE = 16;
  const remSize = ref<number>();

  const timerId = ref<ReturnType<typeof setTimeout>>();

  onMounted(() => {
    updateScale();
    audioRunner(resolveGameFromRoute(currentRoute));
    window.addEventListener('resize', () => debounce(() => updateScale()));
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', () => debounce(() => updateScale()));
  });

  const scale = computed(() =>  (remSize.value || 1) / BASE_FONT_SIZE);

  function updateScale(){
    remSize.value = Number(window.getComputedStyle(document.body).fontSize.split('px')[0]);
  }

  const gameName = computed(() => {
    return resolveGameFromRoute(currentRoute);
  });

  watch(gameName, (newValue) => {
    console.log('watching: ', newValue);
    audioRunner(newValue);
  });

  function loadTrack(trackName: string){
    bgmEngine.stop();

    if (timerId.value){
      clearTimeout(timerId.value);
    }
    timerId.value = setTimeout(
      () => {
        console.log('Playing new track: ', trackName);
        bgmEngine.setTrack(trackName);
        bgmEngine.fadeIn(true);
      },
      1000,
    )
  }

  function audioRunner(gameName: GameType){
    switch (gameName) {
      case 'Stellaris':
        loadTrack(bgmStellaris);
        break;

      case 'Civ-7':
        loadTrack(bgmCiv7);        
        break;

      default:
        break;
    }
  }

</script>

<template>
  <AudioEngine />
  <main
    class="bg-slate-800 text-green-500 min-h-screen min-w-full pb-5"
    :style="`--dynamic-scale: ${scale};`"
  >
    <Navigation />
    <RouterView />
  </main>
</template>
