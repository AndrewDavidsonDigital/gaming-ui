<script setup lang="ts">
  // import { ref } from 'vue';
  // import type { GameType } from '@/lib/interfaces';
  import Example from '@/components/Example.vue';

  import imgCiv7MainMenu from '@/assets/examples/Civ-7/MainMenu.png'
  import imgCiv7Loading from '@/assets/examples/Civ-7/Loading.png'
  import imgCiv7Game from '@/assets/examples/Civ-7/GameUI.png'

  import imgStellarisMainMenu from '@/assets/examples/Stellaris/MainMenu.png'
  import imgStellarisLoading from '@/assets/examples/Stellaris/Loading.png'
  import imgStellarisGame from '@/assets/examples/Stellaris/GameUI.png'
  import { useGame } from '@/stores/game';

  const gameStore = useGame();

</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video mx-auto mt-[2vw]"
  >
    <div class="grid-area-stack">
      <Example
        class="fromHidden transition-opacity duration-500"
        :class="[
          { 'opacity-100' : gameStore.game === 'Civ-7' },
          { 'opacity-0' : gameStore.game !== 'Civ-7' },
        ]"
        :path="imgCiv7MainMenu"
        inline
      >
        : Civilization 7 Main Menu
      </Example>
      <Example
        class="fromHidden transition-opacity duration-500"
        :class="[
          { 'opacity-100' : gameStore.game === 'Stellaris' },
          { 'opacity-0' : gameStore.game !== 'Stellaris' },
        ]"
        :path="imgStellarisMainMenu" 
        inline
      >
        : Stellaris Main Menu
      </Example>
    </div>
    <div class="grid-area-stack">
      <TransitionGroup>
        <Example
          class="fromHidden transition-opacity duration-500"
          :class="[
            { 'opacity-100' : gameStore.game === 'Civ-7' },
            { 'opacity-0' : gameStore.game !== 'Civ-7' },
          ]"
          :path="imgCiv7Loading" 
          inline
        >
          : Civilization 7 Loading Screen
        </Example>
        <Example
          class="fromHidden transition-opacity duration-500"
          :class="[
            { 'opacity-100' : gameStore.game === 'Stellaris' },
            { 'opacity-0' : gameStore.game !== 'Stellaris' },
          ]"
          :path="imgStellarisLoading" 
          inline
        >
          : Stellaris Loading
        </Example>
      </TransitionGroup>
    </div>
    <div class="grid-area-stack">
      <TransitionGroup>
        <Example
          class="fromHidden transition-opacity duration-500"
          :class="[
            { 'opacity-100' : gameStore.game === 'Civ-7' },
            { 'opacity-0' : gameStore.game !== 'Civ-7' },
          ]"
          :path="imgCiv7Game" 
          inline
        >
          : Civilization 7 Game UI
        </Example>
        <Example
          class="fromHidden transition-opacity duration-500"
          :class="[
            { 'opacity-100' : gameStore.game === 'Stellaris' },
            { 'opacity-0' : gameStore.game !== 'Stellaris' },
          ]"
          :path="imgStellarisGame" 
          inline
        >
          : Stellaris Game UI
        </Example>
      </TransitionGroup>
    </div>
  </section>
</template>

<style lang="css" scoped>

  .fromHidden {
    @starting-style {
      opacity: 0;
    }
  }
</style>