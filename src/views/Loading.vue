<script setup lang="ts">
  import Example from '@/components/Example.vue';
  import { onMounted, ref, useTemplateRef } from 'vue';

  import img from '@/assets/examples/Civ-7/Loading.png'

  const DURATION_IN_MILLS = 10000;
  const loadingDuration = ref(`${DURATION_IN_MILLS}ms`);
  
  const hourglassSand = useTemplateRef('hg-sand');
  const hourglassWrapper = useTemplateRef('hg-wrapper');

  onMounted(() => {
    setTimeout(() => {
      
      hourglassWrapper.value?.classList.add('animation-pause', 'opacity-0');
      hourglassSand.value?.classList.add('animation-pause');
    },
    DURATION_IN_MILLS)
  })

</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video bg-slate-500 mx-auto mt-[2vw]"
  >
    <section class="bg-black size-full grid-area-stack relative">
      <div
        ref="hg-wrapper"
        class="grid-area-stack relative self-center mx-auto animate-staggered-rotate "
      >
        <div 
          ref="hg-outer"
          class="
          w-[3vw] h-[4vw] 
          bg-amber-600 
          hourglass-clip
        "
        >
        </div>
        <div 
          ref="hg-inner"
          class="
          w-[3vw] h-[4vw] 
          bg-black
          hourglass-clip-inner
        "
        >
          <div 
            ref="hg-sand"
            class="w-full h-[2vw] bg-white animate-sand-fall"
          ></div>
        </div>
      </div>
      <div class="w-full bg-amber-700 h-[1%] self-end"></div>
      <div class="w-[2%] bg-amber-500 h-[1%] self-end animate-loading-width"></div>
    </section>
  </section>
  <Example :path="img">
    <p>Rather than using a <span class="bg-black text-white px-1 rounded-sm">clip-path</span> and translate for the hourglass and sand, these should be a small animated gif / video, of the sand falling once, then we can rotate them, as this would halve the size of the video / gif embed</p>
  </Example>
</template>

<style lang="css" scoped>
  * {
    --hourglass-duration: 2500ms;
    --hourglass-sand-duration: 1000ms;
  }

  .hourglass-clip-inner {
    clip-path: polygon(
      4px 2px,
      calc(100% - 4px) 2px,
      calc(55% - 2px) calc(45% - 2px),
      calc(55% - 2px) calc(55% + 2px),
      calc(100% - 4px) calc(100% - 2px),
      4px calc(100% - 2px),
      calc(45% + 2px) calc(55% + 2px),
      calc(45% + 2px) calc(45% - 2px),
      4px 2px
    );
  }
  .hourglass-clip {
    clip-path: polygon(
      0 0,
      100% 0,
      55% 45%,
      55% 55%,
      100% 100%,
      0 100%,
      45% 55%,
      45% 45%,
      0 0
    );
  }

  .animate-sand-fall {
    animation-fill-mode: forwards;
    animation-duration: var(--hourglass-duration);
    animation-name: sandFall;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }

  @keyframes sandFall {
    0% {
      transform: translateY(0);
    }
    30%, 100% {
      transform: translateY(120%);
    }
  }

  .animate-loading-width{
    animation-fill-mode: forwards;
    animation-duration: v-bind(loadingDuration);
    animation-name: loadingWidth;
  }

  @keyframes loadingWidth {
    0%{
      width: 0%;
    }
    10%{
      width: 5%;
    }
    20%{
      width: 8%;
    }
    100%{
      width: 100%;
    }
  }

.animate-staggered-rotate{
  animation-fill-mode: forwards;
  animation-duration: var(--hourglass-duration);
  animation-name: staggeredRotate;
  animation-iteration-count: infinite;
}

@keyframes staggeredRotate {
  0%,25%{
    rotate: 0deg;
  }
  75%, 100%{
    rotate: 180deg;
  }
}

</style>