<script setup lang="ts">
import Example from '@/components/Example.vue';

import img from '@/assets/examples/Stellaris/MainMenu.png';
import imgBg from '@/assets/examples/Stellaris/bg/planet.png';

import imgSocialHome from '@/assets/examples/Stellaris/elements/social_home.png';
import imgSocialLock from '@/assets/examples/Stellaris/elements/social_lock.png';
import imgSocialParadox from '@/assets/examples/Stellaris/elements/social_paradox.png';

import imgSocialFacebook from '@/assets/examples/Stellaris/elements/social_fb.png';
import imgSocialTwitter from '@/assets/examples/Stellaris/elements/social_twitter.png';
import imgSocialYoutube from '@/assets/examples/Stellaris/elements/social_youtube.png';
import imgSocialDiscord from '@/assets/examples/Stellaris/elements/social_discord.png';

import imgLogoC from '@/assets/examples/Stellaris/elements/logo_c.png';
import imgLogoParadox from '@/assets/examples/Stellaris/elements/logo_paradox.png';
import imgLogoParadoxShield from '@/assets/examples/Stellaris/elements/logo_paradox_shield.png';

import { ref } from 'vue';

interface IVersion {
  alias?:string;
  number: string;
  build?: string;
}

const version = ref<IVersion>({
  alias: 'Phoenix',
  number: 'v4.0.6',
  build: crypto.randomUUID().split('-')[1],
});

const title = ref('Stellaris');

const menuCollection = ref<string[]>([
    'new game',
    'load game',
    'multiplayer',
    'Cooperative',
    'additional Content',
    'settings',
    'credits',
    'exit',
]);
const logoCollection = ref<string[]>([
  imgLogoC,
  imgLogoParadoxShield,
  imgLogoParadox,
]);
const socialsCollection = ref<string[][]>([
  [
    imgSocialHome,
    imgSocialLock,
    imgSocialParadox,
  ],
  [
    imgSocialFacebook,
    imgSocialTwitter,
    imgSocialYoutube,
    imgSocialDiscord
  ]
])

</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video bg-slate-500 mx-auto mt-[2vw] stellaris-font-equiv text-white"
  >
    <section class="grid-area-stack size-full overflow-clip text-base [&>div]:h-fit [&>div]:pl-6 [&>div]:py-6">
      <img
        class="w-full aspect-video"
        :src="imgBg" 
        alt=""
        aria-hidden
      />
      <div class="mb-auto">
        <h2 class="text-4xl uppercase text-glow">
          {{ title }}
        </h2>
      </div>
      <div class="my-auto flex w-fit flex-col gap-2 items-start [&>*]:transition-all [&>*]:duration-300">
        <template
          v-for="(menu, index) in menuCollection"
          :key="`stellaris_menu__${index}`"
        >
          <button 
            class="
              block w-full 
              pl-0.5 pr-4
              capitalize text-darken-glow text-left
              text-slate-300

              border-l-2 border-l-amber-500/0
              
              hover:translate-x-2 
              hover:border-l-2 hover:border-l-amber-500 
              hover:bg-neutral-900/50

              bg-clip-corner
            "
          >
            {{ menu }}
          </button>
        </template>
      </div>
      <div class="mt-auto flex gap-2">
        <div class="flex gap-2">
          <template
            v-for="(logo,index) in logoCollection"
            :key="`logos__${index}`"
          >
            <img
              :src="logo"
              class="aspect-square size-14"
              alt=""
              role="presentation"
            />
          </template>
        </div>
        <div class="flex flex-col gap-2 justify-end">
          <div class="flex gap-8">
            <template
              v-for="(socialGroup, gIndex) in socialsCollection"
              :key="`socialsGrp__${gIndex}`"
            >
              <div class="flex gap-1.5 items-end">
                <template
                  v-for="(social, index) in socialGroup"
                  :key="`social__${gIndex}-${index}`"
                >
                  <div class="aspect-square size-4 bg-slate-950/50 border-slate-600 border">
                    <img
                      :src="social"
                      class="aspect-square"
                      alt=""
                      role="presentation"
                    />
                  </div>
                </template>
              </div>
            </template>
          </div>
          <div class="text-tiny font-serif">
            Version: {{ version.alias }} {{ version.number }} <span v-if="version.build">(<span class="text-yellow-200">{{ version.build }}</span>)</span>
          </div>
        </div>
      </div>
    </section>
  </section>
  <Example :path="img">
    <p>The exact background hasn't been uploaded into the Stellaris imgr yet so using a similar existing one</p>
  </Example>
</template>

<style lang="css" scoped>
  @reference "@/main.css";
  /* clip-path to render a collection of rays */
  * {
    --clip-path-folded-corner: polygon(
      0 0,
      calc(100% - 0.5rem) 0,
      100% calc(0% + 0.5rem),
      100% 100%,
      0 100%
    )
  }

  .bg-clip-corner {
    clip-path: var(--clip-path-folded-corner);
  }
</style>