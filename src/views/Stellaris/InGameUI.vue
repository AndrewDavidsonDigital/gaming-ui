<script setup lang="ts">
  import { computed, ref, watch } from 'vue';
  import Example from '@/components/Example.vue';

  import imgGame from '@/assets/examples/Stellaris/GameUI.png'
  import imgBG from '@/assets/examples/Stellaris/BG.png'

  import imgLeftSituation from '@/assets/examples/Stellaris/elements/left_situation.png';
  import imgLeftCandle from '@/assets/examples/Stellaris/elements/left_candle.png';
  import imgLeftPolicy from '@/assets/examples/Stellaris/elements/left_policy.png';
  import imgLeftResearch from '@/assets/examples/Stellaris/elements/left_research.png';
  import imgLeftLeaders from '@/assets/examples/Stellaris/elements/left_leaders.png';
  import imgLeftGenetics from '@/assets/examples/Stellaris/elements/left_genetics.png';
  import imgLeftSectors from '@/assets/examples/Stellaris/elements/left_sectors.png';
  import imgLeftExpansion from '@/assets/examples/Stellaris/elements/left_expansion.png';
  import imgLeftFleets from '@/assets/examples/Stellaris/elements/left_fleets.png';
  import imgLeftGhost from '@/assets/examples/Stellaris/elements/left_ghost.png';
  import imgLeftSearch from '@/assets/examples/Stellaris/elements/left_search.png';
  import imgLeftEmpire from '@/assets/examples/Stellaris/elements/left_empire.png';
  import imgLeftMarket from '@/assets/examples/Stellaris/elements/left_markets.png';

  import imgLeftLock from '@/assets/examples/Stellaris/elements/left_lock.png';
  import imgPlayer from '@/assets/examples/Stellaris/elements/player.png';

  
  import imgCurrencyEnergy from '@/assets/examples/Stellaris/elements/top_energy.png';
  import imgCurrencyMinerals from '@/assets/examples/Stellaris/elements/top_minerals.png';
  import imgCurrencyFood from '@/assets/examples/Stellaris/elements/top_food.png';
  
  import imgCurrencyBiomass from '@/assets/examples/Stellaris/elements/top_biomass.png';
  import imgCurrencyAlloys from '@/assets/examples/Stellaris/elements/top_alloys.png';
  import imgCurrencyAmenities from '@/assets/examples/Stellaris/elements/top_amenities.png';
  import imgCurrencyExtra from '@/assets/examples/Stellaris/elements/top_extra.png';
  
  import imgCurrencyInfluence from '@/assets/examples/Stellaris/elements/top_influence.png';
  import imgCurrencyUnit from '@/assets/examples/Stellaris/elements/top_unity.png';
  import imgCurrencyResearch from '@/assets/examples/Stellaris/elements/top_research.png';
  
  import imgCurrencyExpand from '@/assets/examples/Stellaris/elements/top_expanse.png';
  import imgCurrencyEnvoys from '@/assets/examples/Stellaris/elements/top_people.png';
  import imgCurrencyStarBase from '@/assets/examples/Stellaris/elements/top_starbase.png';
  import imgCurrencyFleet from '@/assets/examples/Stellaris/elements/top_fleet.png';
  import { 
    IconSpeedBG,
    IconSpeedPaused,
    IconSpeedFastest,
    IconSpeedFast,
    IconSpeedNormal,
    IconSpeedSlow,
    IconSpeedSlowest,
  } from '@/components/icons';

  
  const currencyCollection = ref<string[][]>([
    [
      imgCurrencyEnergy,
      imgCurrencyMinerals,
      imgCurrencyFood,
    ],
    [
      imgCurrencyBiomass,
      imgCurrencyAlloys,
      imgCurrencyAmenities,
      imgCurrencyExtra,
    ],
    [
      imgCurrencyInfluence,
      imgCurrencyUnit,
      imgCurrencyResearch,
    ],
    [
      imgCurrencyExpand,
      imgCurrencyEnvoys,
      imgCurrencyStarBase,
      imgCurrencyFleet,
    ],
  ]);

  const leftControlsCollection = ref<string[]>([
    imgLeftSituation,
    imgLeftCandle,
    imgLeftSituation,
    imgLeftPolicy,
    imgLeftResearch,
    imgLeftLeaders,
    imgLeftGenetics,
    imgLeftSectors,
    imgLeftExpansion,
    imgLeftFleets,
    imgLeftGhost,
    imgLeftSearch,
    imgLeftEmpire,
    imgLeftMarket,
  ])

  type GameSpeedType = ['Slowest', 40] | ['Slow', 20] | ['Normal', 10] | ['Fast', 5] | ['Fastest', 2];
  const orderedSpeedType: GameSpeedType[] = [
    ["Slowest", 40], 
    ["Slow", 20], 
    ["Normal", 10], 
    ["Fast", 5], 
    ["Fastest", 2]
  ]

  interface IGameState {
    epoch: IEpoch;
    speed: GameSpeedType;
    isPaused: boolean;
    currency: ICurrency[][];
  }

  interface ICurrency {
    current?: number;
    increase?: number;
    maxCapacity?: number;
  }

  interface IEpoch {
    year: number;
    month: number;
    day: number;
  }

  const gameState = ref<IGameState>({
    epoch: {
      year: 2200,
      month: 1,
      day: 1,
    },
    speed: ['Normal', 10],
    isPaused: false,
    currency: [
      [
        {
          current: 54000,
          increase: 276,
        },
        {
          current: 39000,
          increase: 84,
        },
        {
          current: 54000,
          increase: 160,
        }
      ],
      [
        {
          current: 243,
          increase: 55,
        },
        {
          current: 994,
          increase: 2,
        },
        {
          current: 54000,
          increase: 155,
        },
        {
          current: 16700,
          increase: 79,
        }
      ],
      [
        {
          current: 970,
          increase: 5,
        },
        {
          current: 16000,
          increase: 240,
        },
        {
          increase: 492,
        }
      ],
      [
        {
          current: 478,
        },
        {
          current: 0,
          maxCapacity: 2,
        },
        {
          current: 15,
          maxCapacity: 15,
        },
        {
          current: 102,
          maxCapacity: 109,
        }
      ]
    ]
  });

  const lockLeftBar = ref<boolean>(false);

  function handleSpeedChange(increment: 0 | 1 | -1){
    const currentSpeedIndex = orderedSpeedType.findIndex(el => el[0] === gameState.value.speed[0]);
    console.log(currentSpeedIndex)
    switch (increment) {
      case 0:
        return gameState.value.isPaused = !(gameState.value.isPaused);
      case 1:
        if (currentSpeedIndex >= (orderedSpeedType.length - 1)){
          return;
        }
        return gameState.value.speed = orderedSpeedType[currentSpeedIndex + 1];
      case -1:
        if (currentSpeedIndex <= 0){
          return;
        }
        return gameState.value.speed = orderedSpeedType[currentSpeedIndex - 1];
      default:
        break;
    }
  }

  interface INumberFormat {
      tag: string,
      amount: number,
  }

  const numberFormats: Readonly<INumberFormat[]> = [
    {
      tag: 'M',
      amount: 1000000,
    },
    {
      tag: 'K',
      amount: 1000,
    }
  ];

  function condenseNumber(num: number){
    let count = num;
    let tag = '';
    for (const format of numberFormats) {
      if (num > format.amount) {
        count = num / format.amount;
        tag = format.tag;
      }
    }

    return `${count}${tag}`
  }

  const currencyCount = computed(() => currencyCollection.value.reduce((a,b) => a + b.length,0));

  
  const gameSpeed = computed(() => gameState.value.speed);
  const isPaused = computed(() => gameState.value.isPaused);

  watch(isPaused, (newVal) => {
    console.log(Date.now(), ': Game is now', newVal ? 'Paused' : 'Running');
  });
  watch(gameSpeed, (newVal) => {
    console.log(Date.now(), ': Game speed is now set to', newVal[0]);
  });

</script>

<template>
  <section
    id="GameState"
    class="w-[80vw] bg-slate-800 mx-auto rounded-md p-4 flex flex-col"
  >
    <details>
      <summary class="text-xl font-semibold">
        Game-State:
      </summary>
      <div>TBD</div>
    </details>
  </section>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video bg-slate-500 mx-auto mt-8"
  >
    <!-- Inner UI  -->
    <section class="grid-area-stack size-full overflow-clip">
      <img
        :src="imgBG"
        class="size-full"
        role="presentation"
        alt=""
      />
      <!-- hexagon -->
      <article class="aspect-square w-11 grid-area-stack">
        <div
          class="
            bg-clip-hexagon 
            bg-emerald-900
            relative
            z-10

            before:absolute before_bg-clip-hexagon
            before:size-[90%] before:bg-black/50 before:-z-10 before:translate-[5%]
          "
        >
          <img
            :src="imgPlayer"
            class="p-0.5"
            role="presentation"
            alt=""
          />
        </div>
      </article>
      <!-- Left Side Menu -->
      <div
        class="
          grid-area-stack-inner
          mr-auto mb-auto
          mt-[1.625rem]
          pr-[1px] pb-[1px]
          bg-emerald-800
          bg-clip-rhombus

          w-6
          transition-all duration-300

          hover:w-[7rem]
          group
          overflow-clip
        "
        :class="[
          { 'w-[7rem]' : lockLeftBar }
        ]"
      >
        <div 
          class="
            mr-auto mb-auto
            flex flex-col gap-y-2 
            pt-7 pb-1
            from-neutral-950/50 to-neutral-900
            bg-gradient-to-b
            bg-clip-rhombus
          
            w-[calc(1.5rem_-_1px)]
            transition-all duration-300

            group-hover:w-[calc(7rem_-_1px)]
          "
          :class="[
            { 'w-[calc(7rem_-_1px)]' : lockLeftBar }
          ]"
        >
          <template
            v-for="controlImg, index in leftControlsCollection"
            :key="`left_control_${index}`"
          >
            <div class="flex gap-5 pl-[2px]">
              <img
                :src="controlImg"
                class="size-[0.75rem] m-0.5"
                alt=""
                role="presentation"
              />
              <h2 class="text-xs text-slate-300/70">
                foooood
              </h2>
            </div>
          </template>
          <button
            class="pl-[2px]"
            @click="lockLeftBar = !lockLeftBar"
          >
            <img
              :src="imgLeftLock"
              class="size-2 m-0.5 mr-2 mb-2"
              alt=""
              role="presentation"
            />
          </button>
        </div>
      </div>
      <!-- Top Menu -->
      <section
        class="
          self-start
          px-2
          flex justify-between
          bg-gradient-to-b from-emerald-900 to-slate-900
          border-b border-slate-900/50
          w-full
        "
      >
        <article
          class="grid grid-cols-n gap-x-3 ml-10"
          :style="`--column-count: ${1 + currencyCount + (currencyCollection.length - 1)};`"
        >
          <template
            v-for="currencyGroup,gIndex in currencyCollection"
            :key="`currency_${gIndex}`"
          >
            <template
              v-for="currencyImg,index in currencyGroup"
              :key="`currency_${gIndex}-${index}`"
            >
              <article class="container-normal flex flex-col items-center mt-[2px]">
                <img
                  :src="currencyImg"
                  class="size-[0.75rem] max-w-[unset] w-fit"
                  alt=""
                  role="presentation"
                />
                <div class="text-xs text-slate-300/80 text-nowrap whitespace-nowrap">
                  <span v-if="Object.keys(gameState.currency[gIndex][index]).includes('current') && gameState.currency[gIndex][index].current !== undefined"> {{ condenseNumber(gameState.currency[gIndex][index].current) }}</span>
                  <span v-if="gameState.currency[gIndex][index].increase"> +{{ gameState.currency[gIndex][index].increase }}</span>
                  <span v-else-if="gameState.currency[gIndex][index].maxCapacity">/{{ gameState.currency[gIndex][index].maxCapacity }}</span>
                </div>
              </article>
            </template>
            <div 
              class="h-full border-l border-l-emerald-300/20"
              :class="[
                { 'hidden': gIndex >= currencyCollection.length -1 }
              ]"
            ></div>
          </template>
        </article>
        <div class="grid-area-stack-inner w-32">
          <div class="max-w-[6rem] place-self-center outline-1 outline-red-500 overflow-x-hidden mask-fade-x">
            <div 
              class="inline-flex justify-between transition-all duration-200 scale-dynamic flex-nowrap animate-scroll-x w-fit"
              :class="[
                { 'animation-pause': gameState.isPaused }
              ]"
              :style="`--animation-speed-duration: ${gameState.speed[1]}s;`"
            >
              <template
                v-for="i in 10"
                :key="`carouse_${i}`"
              >
                <IconSpeedBG
                  class="mx-auto self-center"
                  :class="[
                    { 'fill-red-500/80' : gameState.isPaused },
                    { 'fill-emerald-300/80' : !(gameState.isPaused) },
                  ]"
                />
              </template>
            </div>
          </div>
          <article class="flex gap-2 whitespace-nowrap place-content-end w-full items-center z-10">
            <button
              class="text-emerald-300 transition-all duration-200 scale-dynamic [&>svg_[data-index='2']]:opacity-70 [&>svg_[data-index='3']]:opacity-50"
              @click="handleSpeedChange(0)"
            >
              <IconSpeedPaused
                v-if="gameState.isPaused"
              />
              <IconSpeedFastest v-else-if="gameState.speed[0] === 'Fastest'" />
              <IconSpeedFast v-else-if="gameState.speed[0] === 'Fast'" />
              <IconSpeedNormal v-else-if="gameState.speed[0] === 'Normal'" />
              <IconSpeedSlow v-else-if="gameState.speed[0] === 'Slow'" />
              <IconSpeedSlowest v-else-if="gameState.speed[0] === 'Slowest'" />
            </button>
            <button
              class="text-sm w-fit flex flex-col [&>*]:mx-auto [&>*]:text-xs min-w-[4rem]"
              @click="handleSpeedChange(0)"
            >
              <span class="text-slate-400 ">{{ gameState.epoch.year }}.{{ gameState.epoch.month }}.{{ gameState.epoch.day }}</span>
              <span class="text-emerald-300">{{ gameState.isPaused ? 'Paused' : gameState.speed[0] + ' Speed' }}</span>
            </button>
            <button
              class="rounded-full bg-emerald-500/50 size-[0.675rem] inline-flex justify-around items-center"
              @click="handleSpeedChange(1)"
            >
              <span class="text-xs text-emerald-300">+</span>
            </button>
            <button
              class="rounded-full bg-emerald-500/50 size-[0.675rem] inline-flex justify-around items-center "
              @click="handleSpeedChange(-1)"
            >
              <span class="text-xs text-emerald-300">-</span>
            </button>
          </article>
        </div>
      </section>
      <div class="mr-auto mt-auto">
        Bottom left
      </div>
      <div class="mx-auto mt-auto">
        Bottom Center
      </div>
      <div class="ml-auto mt-auto">
        Bottom Right
      </div>
    </section>
  </section>
  <Example :path="imgGame" />
</template>

<style lang="css" scoped>
  * {
    --animation-speed-duration: 20s;
    --column-count: 1;
    --rhombus-cut: 1.25rem;
    --clip-path-rhombus: polygon(
      100% 0,
      100% calc(100% - var(--rhombus-cut)),
      calc(100% - var(--rhombus-cut)) 100%,
      0 100%,
      0 calc(0% + var(--rhombus-cut)),
      calc(0% + var(--rhombus-cut)) 0
    );
    --clip-path-hexagon: polygon(
      50% 0%,
      100% 25%,
      100% 75%,
      50% 100%,
      0% 75%,
      0% 25%
    );
  }
  
  .bg-clip-rhombus {
    clip-path: var(--clip-path-rhombus);
  }
  .before_bg-clip-hexagon::before,
  .bg-clip-hexagon {
    clip-path: var(--clip-path-hexagon);
  }

  .grid-cols-n {
    grid-template-columns: repeat(var(--column-count), 1fr);
  }

  .scale-dynamic {
    scale: var(--dynamic-scale);
  }

  .mask-fade-x {
    mask: linear-gradient(
      90deg, 
      transparent, 
      rgba(255, 255, 255, 0.5) 30%, 
      rgba(255, 255, 255, 0.5) 70%, 
      transparent
    );
  }

  .animate-scroll-x {
    animation-name: scroll-x;
    animation-duration: var(--animation-speed-duration);
    animation-timing-function: linear;
    animation-iteration-count: infinite;
  }

  @keyframes scroll-x {
    0% {
      transform: translate(-30%);
    }
    100% {
      transform: translate(0%);
    }
  }
</style>