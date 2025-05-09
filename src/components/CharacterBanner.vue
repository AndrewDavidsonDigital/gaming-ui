<script setup lang="ts">
  import type { DiplomacyStateType, IColouration } from '@/lib/interfaces';

  
  import imgLeader from '@/assets/examples/Civ-7/elements/Leader.png'
  import imgCiv from '@/assets/examples/Civ-7/elements/Civ.png'



  interface IProps {
    ruler: string;
    civ: string;
    relationship?: DiplomacyStateType;
    colour: IColouration;
  }

  const props = defineProps<IProps>();

</script>

<template>
  <section class="w-11 grid grid-rows-1">
    <!--  hex  -->
    <article class="aspect-square w-11 grid-area-stack">
      <div 
        class="
        hexagon 
        bg-civ-brand
        relative
        z-10

        before:absolute before_hexagon
        before:size-[90%] before:bg-black/50 before:-z-10 before:translate-[5%]
      "
      >
      </div>
      <img
        :src="imgLeader"
        class="scale-[110%] z-10 translate-y-[-7%]"
        role="presentation"
        :alt="`leader portrait for ${props.ruler}`"
      />
    </article>

    <!-- banner -->
    <article class="grid-area-stack h-20 w-9 -translate-y-4 mx-auto">
      <div
        class="
          bg-gradient-to-b from-red-900 via-85% via-red-950 to-red-950 
          flex flex-col justify-end 
          pb-4
          mx-[1px]
          triangle-bottom
          z-10
        "
      >
        <img
          :src="imgCiv"
          class="max-w-6 mx-auto pb-1"
          role="presentation"
          :alt="`Civilization logo for ${props.civ}`"
        />
      </div>
      <div
        class="
          bg-gradient-to-b via-70% to-90%
          from-transparent via-civ-brand to-transparent 
          w-full
          -translate-y-1
          triangle-bottom
        "
      ></div>
    </article>
  </section>
</template>

<style lang="css" scoped>
  /* --clip-path-hexagon: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%); *//* Flat-top */ 
  /* --clip-path-hexagon: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%); *//* Flat-Edge */ 
  *{
    --clip-path-hexagon:    polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    --clip-path-triangle-bottom:    polygon(0% calc(100% - 1vw), 50% 100%,  100% calc(100% - 1vw), 100% 0%, 0% 0%);
  }

  .hexagon{
    clip-path: var(--clip-path-hexagon);
  }
  .before_hexagon::before {
    clip-path: var(--clip-path-hexagon);
  }
  
  .triangle-bottom {
    clip-path: var(--clip-path-triangle-bottom);
  }

</style>