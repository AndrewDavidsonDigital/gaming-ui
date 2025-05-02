<script setup lang="ts">

</script>

<template>
  <section class="bg-black size-full grid-area-stack relative">
    <div 
      class="
        self-center mx-auto 
        w-14 h-18 
        bg-amber-600 
        hourglass-clip
        animate-staggered-rotate
      "
    >
    </div>
    <div 
      class="
        self-center mx-auto
        w-14 h-18
        bg-black
        hourglass-clip-inner
        animate-staggered-rotate
      "
    >
      <div class="w-full h-8 bg-white animate-sand-fall"></div>
    </div>
    <div class="w-full bg-amber-700 h-4 self-end"></div>
    <div class="w-[2%] bg-amber-500 h-4 self-end animate-loading-width"></div>
  </section>
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
    animation-duration: 10s;
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