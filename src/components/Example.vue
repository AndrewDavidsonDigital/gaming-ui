<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">

interface IProps {
  path: string;
}

defineProps<IProps>();

</script>

<template>
  <section class="w-[80vw] mx-auto">
    <h2>Example</h2>
    <slot />
    <img
      :src="path"
      alt=""
    />
  </section>
</template>
