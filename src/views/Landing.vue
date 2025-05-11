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
import GameSwitcher from '@/components/GameSwitcher.vue';




  const gameStore = useGame();

</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video mx-auto mt-[2vw]"
  >
    <TransitionGroup>
      <template v-if="gameStore.game === 'Civ-7'">
        <Example
          :path="imgCiv7MainMenu"
          inline
        >
          : Civilization 7 Main Menu
        </Example>
        <Example
          :path="imgCiv7Loading" 
          inline
        >
          : Civilization 7 Loading Screen
        </Example>
        <Example
          :path="imgCiv7Game" 
          inline
        >
          : Civilization 7 Game UI
        </Example>
      </template>
      <template v-else-if="gameStore.game === 'Stellaris'">
        <Example
          :path="imgStellarisMainMenu" 
          inline
        >
          : Stellaris Main Menu
        </Example>
        <Example
          :path="imgStellarisLoading" 
          inline
        >
          : Stellaris Loading
        </Example>
        <Example
          :path="imgStellarisGame" 
          inline
        >
          : Stellaris Game UI
        </Example>
      </template>
    </TransitionGroup>
  </section>
</template>
