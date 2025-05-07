<script setup lang="ts">
import Example from '@/components/Example.vue';

import imgMainMenu from '@/assets/examples/Civ-7/Main Menu.png'
import imgLoading from '@/assets/examples/Civ-7/Loading.png'
import imgGame from '@/assets/examples/Civ-7/GameUI.png'

</script>

<template>
  <Example :path="imgMainMenu" />
  <Example :path="imgLoading" />
  <Example :path="imgGame" />
</template>
