<script setup lang="ts">
import Example from '@/components/Example.vue';

import img from '@/assets/examples/Civ-7/Main Menu.png'

</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video bg-slate-500 mx-auto mt-[2vw]"
  >
  </section>
  <Example :path="img">
    <p>Rather than using a <span class="bg-black text-white px-1 rounded-sm">clip-path</span> and translate for the hourglass and sand, these should be a small animated gif / video, of the sand falling once, then we can rotate them, as this would halve the size of the video / gif embed</p>
  </Example>
</template>
