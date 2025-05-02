<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <main class="bg-slate-800 text-green-500 min-h-screen min-w-full">
    <Navigation />
    <section
      id="ConstrainedCanvas"
      class="w-[80vw] aspect-video bg-slate-500 mx-auto mt-[2vw]"
    >
      <RouterView />
    </section>
  </main>
</template>
