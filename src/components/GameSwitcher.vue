<script setup lang="ts">
  import { useGame } from '@/stores/game';
  const gameStore = useGame();

</script>

<template>
  <select
    v-model="gameStore.game"
    aria-label="Same Selector"

    class="border-none bg-slate-900"
  >
    <option value="Civ-7">
      Civilization 7
    </option>
    <option value="Stellaris">
      Stellaris
    </option>
  </select>
</template>
