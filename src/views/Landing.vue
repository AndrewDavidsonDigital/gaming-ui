<script setup lang="ts">
import Example from '@/components/Example.vue';

import imgMainMenu from '@/assets/examples/Civ-7/Main Menu.png'
import imgLoading from '@/assets/examples/Civ-7/Loading.png'
import imgGame from '@/assets/examples/Civ-7/GameUI.png'

</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video mx-auto mt-[2vw]"
  >
    <p>so, 2days into this project i realized i really should have just set the root-font to be a `viewport-width` value, since this a forced 16:9 aspect project with needing for dynamic scaling of most elements with relation to. . . well `viewport-width`</p>
    <p>this realization came too late though and I have no plans to refactor everything to viewports rem perspective, so we will continue to build with abstract declarations `w-[3vw]`</p>
    <Example :path="imgMainMenu" />
    <Example :path="imgLoading" />
    <Example :path="imgGame" />
  </section>
</template>
