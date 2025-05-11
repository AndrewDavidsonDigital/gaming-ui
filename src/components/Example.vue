<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">

interface IProps {
  path: string;
  inline?: boolean;
}

const props = defineProps<IProps>();

</script>

<template>
  <section class="w-[80vw] mx-auto">
    <div
      :class="[
        { 'inline-flex' : props.inline },
      ]"
    >
      <h2>Example</h2>
      <slot />
    </div>
    <img
      :src="path"
      alt=""
    />
  </section>
</template>
