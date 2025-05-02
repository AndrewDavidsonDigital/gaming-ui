<script setup lang="ts">
import Example from '@/components/Example.vue';

import img from '@/assets/examples/Civ-7/Main Menu.png'
import imgBg from '@/assets/examples/Civ-7/bg/mayan.webp'

import imgChar from '@/assets/examples/Civ-7/Leader_clean.png'

import elementBorderFlat from '@/assets/examples/Civ-7/elements/BorderLength_Clean.png'
import elementBorderFlatX from '@/assets/examples/Civ-7/elements/BorderLengthX_Clean.png'
import elementBorderCorner from '@/assets/examples/Civ-7/elements/BorderCorner_Clean.png'
import elementHrPlain from '@/assets/examples/Civ-7/elements/HR_clean.png'
import elementHrFlourish from '@/assets/examples/Civ-7/elements/Flourish_Clean.png'
import elementHrUnderline from '@/assets/examples/Civ-7/elements/Underline_Clean.png'

import { ref } from 'vue';


const superTitle = ref("sid meier's");
const title = ref('Civilization VII');

const menuCollection = ref<string[][]>([
  [
    'continue',
  ],
  [
    'new game',
    'load game',
    'multiplayer',
  ],
  [
    'manage mods',
    'your progress',
    'social menu',
    '2k account',
    'options',
    'extra',
    'exit',
  ]
]);

</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video bg-slate-500 mx-auto mt-[2vw] civilization-font-equiv"
  >
    <section class="grid-area-stack size-full overflow-clip dynamic-font-size">
      <img
        class="w-full aspect-video"
        :src="imgBg" 
        alt=""
        aria-hidden
      />
      <div class="bg-gradient-to-br via-40% to-80% from-neutral-900 via-slate-800 to-slate-800/15"></div>
      <div class="bg-gradient-to-b via-40% to-70% from-neutral-900 via-slate-800/50 to-slate-800/15"></div>
      <div class="size-full grid-area-stack bg-neutral-900/20">
        <!-- corners -->
        <img
          class=" "
          :src="elementBorderCorner" 
          alt=""
          aria-hidden
        />
        <img
          class="scale-x-[-1] -rotate-90 "
          :src="elementBorderCorner" 
          alt=""
          aria-hidden
        />
        <img
          class="scale-x-[-1] justify-self-end "
          :src="elementBorderCorner" 
          alt=""
          aria-hidden
        />
        <img
          class="rotate-90 justify-self-end "
          :src="elementBorderCorner" 
          alt=""
          aria-hidden
        />
        
        <!-- top horizontal -->
        <img
          class="origin-top justify-self-center -my-0.25 mx-[50px] w-[calc(100%_-_100px)] h-[150px]"
          :src="elementBorderFlatX" 
          alt=""
          aria-hidden
        />

        <!-- edge vertical -->
        <img
          class="scale-x-[-1] origin-top justify-self-end mt-[50px] h-[calc(80%_-_150px)] w-[150px] mask-v"
          :src="elementBorderFlat" 
          alt=""
          aria-hidden
        />
        <img
          class=" origin-top justify-self-start mt-[50px] h-[calc(80%_-_150px)] w-[150px] mask-v"
          :src="elementBorderFlat" 
          alt=""
          aria-hidden
        />
      </div>
      <div class="grid grid-cols-2 mx-auto">
        <nav class="flex flex-col uppercase [&>*]:mx-auto justify-self-end text-white mt-[3vw] w-[30vw] md:w-[25vw]">
          <img
            class="scale-[50%] mask-x-both"
            :src="elementHrFlourish"
            alt=""
            aria-hidden
          />
          <h4 class="text-xs opacity-50 text-civ-brand">
            {{ superTitle }}
          </h4>
          <h2 class="text-4xl text-civ-brand">
            {{ title }}
          </h2>
          <img
            class="scale-[80%]"
            :src="elementHrUnderline"
            alt=""
            aria-hidden
          />
          <template
            v-for="(group, g_index) in menuCollection"
            :key="`nav_${g_index}`"
          >
            <template
              v-for="(navTitle, index) in group"
              :key="`nav_${g_index}_${index}`"
            >
              <button 
                class="
                  w-fit min-w-[30%] 
                  uppercase text-lg 
                  cursor-pointer 
                  transition-all duration-500 
                  hover_text-civ-brand hover_border-y-civ-gold 
                  border-y-[0.5px] border-y-transparent
                  px-8
                  relative mask-x-both-short

                  hover-rays
                  after_rays-clip-path after_bg-civ-gold 
                  before_rays-clip-path before_bg-civ-gold 
                "
              >
                {{ navTitle }}
              </button>
            </template>
            <img
              v-if="g_index !== menuCollection.length -1"
              :src="elementHrPlain"
              class="w-[15vw] mask-x-both"
              alt=""
              aria-hidden
            />
          </template>
        </nav>
        <img 
          class="mt-[6vw]"
          :src="imgChar"
          alt=""
        />
      </div>
    </section>
  </section>
  <Example :path="img">
    <p>Rather than using a <span class="bg-black text-white px-1 rounded-sm">img</span> for the leader we can easily replace this with a threeJS canvas of the model with the same size constraints as with the image.</p>
    <p>Note that we are just using here a similar font-face rather than paying for the actual one.</p>
    <p>The border images can be cleaned up a lot more, but thats really not the point here as we wanted to indicate that the structure of [Left Left-UpperLeft-corner Top-UpperLeft-corner Top  Top-UpperRight-corner Right-UpperRight-corner Right]</p>
    <p>The hover ray effect has also been replicated in a way that we wouldn't realistically use</p>
  </Example>
</template>

<style lang="css" scoped>
  @reference "../main.css";

  /* clip-path to render a collection of rays */
  * {
    --clip-path-rays: polygon(
      0 0,
      100% 0,

      95% 0,
      98% 9.1%,
      98% 10.4%,
      93% 0,

      90% 0,
      95% 9.1%,
      95% 10.4%,
      88% 0,

      85% 0,
      90% 14.7%,
      90% 14.7%,
      83% 0,

      81% 0,
      87% 16.1%,
      87% 16.1%,
      79% 0,

      75% 0,
      81% 20.1%,
      81% 20.1%,
      73% 0,

      70% 0,
      74% 21.4%,
      74% 21.4%,
      68% 0,

      66% 0,
      68% 22.8%,
      68% 22.8%,
      65% 0,

      60% 0,
      61% 22.8%,
      61% 22.8%,
      59% 0,

      55% 0,
      55% 25.4%,
      55% 25.4%,
      54% 0,

      51% 0,
      51% 26.8%,
      50% 26.8%,
      50% 0,

      /* Mirrored points for the left half */
      
      45% 0,
      44% 25.4%,
      44% 25.4%,
      44% 0,

      40% 0,
      38% 22.8%,
      38% 22.8%,
      39% 0,

      34% 0,
      30% 22.8%,
      30% 22.8%,
      32% 0,

      30% 0,
      25% 21.4%,
      25% 21.4%,
      28% 0,

      24% 0,
      18% 20.1%,
      18% 20.1%,
      22% 0,

      16% 0,
      10% 14.7%,
      10% 14.7%,
      14% 0,

      6% 0,
      1% 9.1%,
      1% 10.4%,
      5% 0,

      0 0
    );
  }
  * {
    --colour-civ-brand: oklch(0.6 0.07 66.93);
    --colour-civ-gold: oklch(0.77 0.14 91.04);
  }

  .hover-rays:hover::after,  
  .hover-rays:hover::before {
    @apply !opacity-100;
  }
  .hover-rays::after,  
  .hover-rays::before {
    content: '';

    @apply absolute;
    @apply size-full left-0;
    @apply opacity-0;
    @apply transition-all duration-500;
    mask-image: linear-gradient(to right, transparent 0, black 50%, transparent 100%);
  }
  
  .hover-rays::after {
    @apply rotate-180;
  }

  .text-civ-brand {
    color: var(--colour-civ-brand);
  }
  .hover_text-civ-brand:hover{
    color: var(--colour-civ-brand);
  }
  .hover_border-y-civ-gold:hover{
    border-top-color: var(--colour-civ-gold);
    border-bottom-color: var(--colour-civ-gold);
  }
  .before_bg-civ-gold:before{
    --tw-gradient-from: var(--colour-civ-gold);
    @apply bg-gradient-to-b to-transparent;
    @apply to-40%;
  }
  .after_bg-civ-gold:after{
    --tw-gradient-from: var(--colour-civ-gold);
    @apply bg-gradient-to-b to-transparent;
    @apply to-40%;
  }

  .mask-v {
    mask-image: linear-gradient(to bottom, black 0, black 60%, transparent 100%);
  }
  .mask-x-both {
    mask-image: linear-gradient(to right, transparent 0, black 50%, transparent 100%);
  }
  .mask-x-both-short {
    mask-image: linear-gradient(to right, transparent 0, black 25%, black 75%, transparent 100%);
  }

  .dynamic-font-size {
    button {
      font-size: 1vw;
    }
    h2 {
      font-size: 2vw;
    }
    h4 {
      font-size: 0.5vw;
    }
  }

  .before_rays-clip-path:before {
    clip-path: var(--clip-path-rays)
  }
  .after_rays-clip-path:after {
    clip-path: var(--clip-path-rays)
  }

</style>