<script setup lang="ts">
  import Example from '@/components/Example.vue';
  import { ref } from 'vue';

  import img from '@/assets/examples/Stellaris/Loading.png';
  import imgBg from '@/assets/examples/Stellaris/bg/planet.png';

  const DURATION_IN_MILLS = 10000;
  const loadingDuration = ref(`${DURATION_IN_MILLS}ms`);

</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video bg-slate-500 mx-auto mt-[2vw] stellaris-font-equiv"
  >
    <section class="bg-black size-full grid-area-stack relative">
      <img
        class="w-full aspect-video"
        :src="imgBg" 
        alt=""
        aria-hidden
      />
      <div 
        class="
          w-full h-5
          bg-emerald-700/30
          self-end
          max-w-[20rem] mx-auto mb-12
          relative
          border border-slate-600/50
          
          after:bg-emerald-700z
          after:bg-gradient-to-tr after:via-40%
          after:from-emerald-900 after:via-emerald-800/50 after:to-teal-500/50
          after_animate-loading-width 
          after:absolute after:size-full

          before:absolute before:size-full
          before_current-percent before:text-slate-300 before:z-10 
          before:text-center before:text-sm
        "
      >
      </div>
    </section>
  </section>
  <Example :path="img">
    <p>The exact background hasn't been uploaded into the Stellaris imgr yet so using a similar existing one</p>
  </Example>
</template>

<style lang="css" scoped>
  @reference "@/main.css";

  .after_animate-loading-width::after,
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


  @property --num {
    syntax: "<integer>";
    initial-value: 0;
    inherits: false;
  }

  .before_current-percent {
    animation-fill-mode: forwards;
    animation-name: counter;
    animation-duration: v-bind(loadingDuration);
    counter-reset: num var(--num);

  }

  .before_current-percent::before {
    content: counter(num) "%";
  }

  @keyframes counter {
    0%{
      --num: 0;
    }
    10%{
      --num: 5;
    }
    20%{
      --num: 8;
    }
    100%{
      --num: 100;
    }
  }

</style>