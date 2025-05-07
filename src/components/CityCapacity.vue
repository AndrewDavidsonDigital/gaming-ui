<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
  import iconCity from '@/assets/examples/Civ-7/elements/Icon_City.png';


  interface IProps {
    current: number;
    max: number;
  }

  const props = defineProps<IProps>();

</script>

<template>
  <div
    class="flex gap-2 text-slate-400 dynamic-font-size"
    :class="[{'!text-red-500/60' : props.current > props.max }]"
  >
    <img
      :src="iconCity"
      class="size-[1.5vw]"
      role="presentation"
      alt=""
    />
    {{ props.current }}/{{ props.max }}
  </div>
</template>

<style lang="css" scoped>
  .dynamic-font-size {
    font-size: 1vw;
  }
</style>