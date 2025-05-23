<script setup lang="ts">
  import imgGalaxy from '@/assets/examples/Stellaris/elements/PlaqueIcon.png';

  interface IProps {
    empireName: string;
    empireType: string;
  }
  const props = defineProps<IProps>();


</script>

<template>
  <button 
    class="
      scale-[80%]
      
      text-xs text-slate-200 
      border border-transparent

      flex
    "
  >
    <div class="-mr-2 z-10">
      <slot name="player"></slot>
    </div>
    <div class="grid-area-stack bg-clip-banner bg-emerald-500/20 my-1">
      <div 
        class="
        bg-neutral-900/80 border-emerald-900/40 
          text-darken-glow
          flex flex-col justify-center 
          px-12 py-1
          my-auto
          bg-clip-banner
        "
      >
        <h3 class=" text-mlg stellaris-font-equiv">
          {{ props.empireName }}
        </h3>
        <h4 class="text-emerald-300/70 text-darken-glow">
          {{ props.empireType }}
        </h4>
      </div>
    </div>
    <div class="-mr-2 z-10 my-auto">
      <img
        class="border border-emerald-400/50 max-h-10"
        :src="imgGalaxy"
        alt=""
        role="presentation"
      />
    </div>
  </button>
</template>

<style scoped>
  @reference "@/main.css";
  * {
    --banner-cut: 0.25rem;
    --banner-indent: 1.25rem;
    --clip-path-banner: polygon(
      0% 50%,

      0% 10%,
      calc(0% + var(--banner-indent)) 10%,
      calc(0% + var(--banner-indent) + var(--banner-cut)) 0%,

      calc(100% - var(--banner-indent) - var(--banner-cut)) 0%,
      calc(100% - var(--banner-indent)) 10%,
      100% 10%,

      100% 90%,
      calc(100% - var(--banner-indent)) 90%,
      calc(100% - var(--banner-indent) - var(--banner-cut)) 100%,

      calc(0% + var(--banner-indent) + var(--banner-cut)) 100%,
      calc(0% + var(--banner-indent)) 90%,
      0% 90%

    );
  }

  .bg-clip-banner {
    clip-path: var(--clip-path-banner);
  }
</style>
