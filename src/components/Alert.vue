<script setup lang="ts">
  import type { AlertType } from '@/lib/interfaces';
  import iconMilitary from '@/assets/examples/Stellaris/elements/ControlGroups_Military.png';
  import iconPlanet from '@/assets/examples/Stellaris/elements/ControlGroups_Planet.png';

  interface IProps {
    type: AlertType;
    name: string;
  }
  const props = defineProps<IProps>();


</script>

<template>
  <article class="grid-area-stack size-6">
    <div
      class="
        mt-[-0.5rem] 
        h-2 w-[0.1rem] 
        mx-auto
        size-full
        flex flex-col

        bg-gradiented
      "
    >
    </div>
    <button 
      class="
        size-full
        text-xs text-slate-200 
        border border-transparent
        grid-area-stack
        bg-amber-600

        bg-clip-square-edge
      " 
    >
      <div 
        class="
        flex
        gap-1 items-center 
        p-[1px] 
        bg-black/80
        bg-clip-square-edge
      "
      >
        <img
          v-if="props.type === 'Research_Bio'"
          :src="iconMilitary"
          class="size-4"
          role="presentation"
          alt=""
        />
        <img
          v-else-if="props.type === 'Research_Engineering'"
          :src="iconPlanet"
          class="size-4"
          role="presentation"
          alt=""
        />
        <img
          v-else-if="props.type === 'Research_Physics'"
          :src="iconPlanet"
          class="size-4"
          role="presentation"
          alt=""
        />
        <img
          v-else-if="props.type === 'Rift'"
          :src="iconPlanet"
          class="size-4"
          role="presentation"
          alt=""
        />
      </div>
    </button>
  </article>
</template>

<style scoped>
  @reference "@/main.css";

  * {
    --bg-gradient-colour: oklch(66.6% 0.179 58.318);
    --edge-cut: 0.25rem;
    --clip-path-square-edge: polygon(
      100% 0%,

      100% calc(100% - var(--edge-cut)),
      calc(100% - var(--edge-cut)) 100%,

      0% 100%,
      
      0% calc(0% + var(--edge-cut)),
      calc(0% + var(--edge-cut)) 0%,

      100% 0%
    );
  }

  .bg-clip-square-edge {
    clip-path: var(--clip-path-square-edge);
  }

  .bg-gradiented {
    background: linear-gradient(
      to bottom,
      color-mix(in oklab, var(--bg-gradient-colour) 80%, transparent) 0%,
      color-mix(in oklab, var(--bg-gradient-colour) 80%, transparent) 20%,
      color-mix(in oklab, var(--bg-gradient-colour) 20%, transparent) 20%,
      color-mix(in oklab, var(--bg-gradient-colour) 20%, transparent) 80%,
      color-mix(in oklab, var(--bg-gradient-colour) 80%, transparent) 80%,
      color-mix(in oklab, var(--bg-gradient-colour) 80%, transparent) 100%
    )
  }
</style>
