<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
import IconButton from './IconButton.vue';
import imgAgeFlourish from '@/assets/examples/Civ-7/elements/Age_Flourish.png';


interface IProps {
    progress: number;
    crises:number[];
  }

  const props = defineProps<IProps>();
</script>

<template>
  <IconButton
    size="lg"
    :banner="`${props.progress}%`"
    class="
      relative
      
      before:absolute 
      before:bg-stone-900 before:size-[4.55vw] 
      before:-left-[0.25vw] before:-top-[0.3vw]
      before:rounded-full
    "
  >
    <img
      :src="imgAgeFlourish"
      alt=""
      role="presentation"
      class="absolute left-[-1.5vw] size-[120%] -translate-y-1/2 top-1/2"
    />
    <template
      v-for="(crisis, index) in props.crises"
      :key="`crisis_${index}`"
    >
      <div
        class="absolute size-[95%] bottom-[0.1vw] origin-center rotate-[var(--rotation-percentage)]"
        :style="`--rotation-percentage: ${crisis*3.6 + 45 + 180}deg;`"
      >
        <div
          :data-percentage="crisis"
          class="
            scale-[75%]
            size-[0.5vw]
            rounded-full
            bg-red-700
            blur-[0.025vw]
            relative
            z-10

            before:absolute before:size-full before:rounded-full before:z-10
            before:border-2 before:p-[0.4vw] before:translate-[-0.25vw] before:border-civ-brand

            after:absolute after:size-full after:bg-civ-gold after:translate-[0.3vw] after_clip-triangle
          "
        ></div>
      </div>
    </template>
    <slot></slot>
  </IconButton>
</template>


<style lang="css" scoped>

  .after_clip-triangle::after {
    clip-path: polygon(90% 0%, 0% 90%, 100% 100%)
  }

</style>