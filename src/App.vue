<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import Navigation from '@/components/Navigation.vue';
</script>

<template>
  <main class="bg-slate-800 text-green-500 min-h-screen min-w-full">
    <Navigation />
    <RouterView />
  </main>
</template>
