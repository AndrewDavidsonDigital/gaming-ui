<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
  import { useRoute } from 'vue-router'
  import { computed, onMounted, ref } from 'vue';
  import { resolveGameFromRoute, routes } from '@/router'
  import GameSwitcher from './GameSwitcher.vue';
  import { useGame } from '@/stores/game';
  import { useBgmEngine } from '@/stores/audio';
  import { IconVolume, IconVolumeOff } from './icons';

  const gameStore = useGame();
  const bgmEngine = useBgmEngine();

  const currentRoute = useRoute();

  const routesStellaris = computed(() => routes.filter(el => el.game === 'Stellaris'));
  const routesCiv = computed(() => routes.filter(el => el.game === 'Civ-7'));
  const isPaused = ref<boolean>(false);

  onMounted(() => {
    setTimeout(() => {
      const gameName = resolveGameFromRoute(currentRoute);
      if (gameStore.game !== gameName){
        gameStore._setType(gameName)
      }
      console.log(gameStore.game);

    }, 100)
  });

  bgmEngine.$onAction((el)=> {
    const startTime = Date.now()
    console.log(`NAV $onAction: \t[${el.name}]` );
    el.onError((error) => {
      console.warn(
        `Failed "${el.name}" after ${Date.now() - startTime}ms.\nError: ${error}.`
      )
    })

    if (el.name === 'pause'){
      el.after((_result) => {
        console.log('pause-triggered');
        isPaused.value = true;
      })
    }

    else if (el.name === 'play'){
      el.after((_result) => {
        isPaused.value = false;
      })
    }
    
    // else { console.trace(`NAV OTHER CALL: \t${el.name}` );}
  });


</script>

<template>
  <header class="h-fit bg-slate-900 sticky top-0 z-nav">
    <section class="flex justify-center gap-x-6 container-normal">
      <GameSwitcher />
      <div class="ml-5 flex gap-1">
        <button 
          @click="() => bgmEngine.playPause()"
        >
          <IconVolumeOff v-show="isPaused" />
          <IconVolume v-show="!isPaused" />
        </button>
        <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
        <input 
          v-model="bgmEngine.volumeRaw"
          type="range"
          class="max-w-[6rem] thin-slider"
          :min="0"
          :max="1"
          :step="0.05"
          @input="() => bgmEngine.volumeRefresh()"
        />
      </div>
    </section>
    <nav class="flex gap-x-4 justify-center">
      <template
        v-if="gameStore.game === 'Stellaris'"
      >
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
      </template>
      <template
        v-if="gameStore.game === 'Civ-7'"
      >
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
      </template>
    </nav>
  </header>
</template>
