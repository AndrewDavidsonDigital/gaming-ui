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
    IconPlus,
    IconMinus,
  } from '@/components/icons';
  import type { ControlKeyType, ControlType } from '@/lib/interfaces';
  import ControlGroup from '@/components/ControlGroup.vue';
  import GamePlaque from '@/components/GamePlaque.vue';

  /**
   * Tuple: String: name, Number: Duration
   */
  type GameSpeedType = ['Slowest', 16] | ['Slow', 12] | ['Normal', 8] | ['Fast', 4] | ['Fastest', 2];
  type SpeedIndexType = 1 | 2;

  interface IGameState {
    epoch: Date;
    speed: GameSpeedType;
    isPaused: boolean;
    currency: ICurrency[][];
    controlGroups: IControlGroup[];
    empire: IEmpire;
  }

  interface IEmpire {
    name: string;
    type: string;
  }

  interface IControlGroup {
    key: ControlKeyType;
    type: ControlType;
    group: any[];
  }

  interface ICurrency {
    current?: number;
    increase?: number;
    maxCapacity?: number;
  }
  
  interface ISpeedConfig {
    activeIndex: SpeedIndexType;
    speeds: [GameSpeedType,GameSpeedType,GameSpeedType],
  }
  
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

  const orderedSpeedType: GameSpeedType[] = [
    ["Slowest", 16], 
    ["Slow", 12], 
    ["Normal", 8], 
    ["Fast", 4], 
    ["Fastest", 2]
  ]

  const gameState = ref<IGameState>({
    empire: {
      name: 'Devourer of Stars',
      type: 'Blood Forrest',
    },
    epoch: new Date('2200.1.1'),
    speed: ['Normal', 8],
    isPaused: true,
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
          maxCapacity: 1000,
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
    ],
    controlGroups: [
      {
        key: '1',
        type: 'Military',
        group: [],
      },
      {
        key: '2',
        type: 'Planet',
        group: [],
      },
      {
        key: '3',
        type: 'Civilian',
        group: [],
      },
      {
        key: '4',
        type: 'Other',
        group: [],
      },
    ],
  });

  const lockLeftBar = ref<boolean>(false);

  // never access speeds[0] as this is padding as access renderer's are 1 indexed rather than 0
  const speedLayer = ref<ISpeedConfig>({
    activeIndex: 1,
    speeds: [
      ["Normal", 8],
      ["Normal", 8],
      ["Normal", 8],
    ]
  });

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
      if (num >= format.amount) {
        count = parseInt((num / format.amount).toFixed(0));
        tag = format.tag;
      }
    }

    return `${count}${tag}`
  }

  function alternateSpeedIndexLayer(newSpeed: GameSpeedType){
    if (speedLayer.value.activeIndex === 2){
      speedLayer.value.speeds[1] = newSpeed;
      speedLayer.value.activeIndex = 1;
    } else {
      speedLayer.value.speeds[2] = newSpeed;
      speedLayer.value.activeIndex = 2;
    }
  }

  /* ------------------------------------ Game Loop ------------------------------------------------ */
  const gameLoopId = ref<number>(-1);
  const MIN_TICK = 125;
  const lastTick = ref<number>(-1);

  function startTicker(){
    gameLoopId.value = setInterval(
      () => nextTick(),
      (MIN_TICK * gameSpeed.value[1])
    ) as unknown as number;
  }

  function stopTicker(){
    if (gameLoopId.value && gameLoopId.value !== -1){
      clearInterval(gameLoopId.value);
    }
  }

  function nextTick(){
    const now = Date.now();
    console.log(now,`::Tick`);

    // update lastTick
    lastTick.value = now;

    // increment date
    gameState.value.epoch.setDate(gameState.value.epoch.getDate() + 1);

    //increment currencies
    gameState.value.currency.forEach(grp => grp.forEach( cur => {
      if (cur.current && cur.maxCapacity && cur.current >= cur.maxCapacity){
        return;
      }
      if (cur.increase && cur.current){
        cur.current += cur.increase;
      }
    }))
  }

  /* --------------------------------- Reactive Functions --------------------------------------------- */

  const currencyCount = computed(() => currencyCollection.value.reduce((a,b) => a + b.length,0));

  const gameSpeed = computed(() => gameState.value.speed);
  const isPaused = computed(() => gameState.value.isPaused);

  watch(isPaused, (newVal) => {
    console.log(Date.now(), ': Game is now', newVal ? 'Paused' : 'Running');
    if (newVal){
      stopTicker()
    }else {
      startTicker()
    }
  });

  watch(gameSpeed, (newVal) => {
    console.log(Date.now(), ': Game speed is now set to', newVal[0]);
    alternateSpeedIndexLayer(newVal);
    if (!(isPaused.value)){
      stopTicker();
      startTicker();
    }
  });

/* ---------------------------------------------------------------------------------------------------- */

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
            class="p-0.5 size-full"
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
          flex justify-between
          bg-gradient-to-b from-emerald-900 to-slate-900
          border-b border-slate-900/50
          w-full
        "
      >
        <article
          class="grid grid-cols-n gap-x-3 ml-6 [&>article]:min-w-[2rem] scale-[75%]"
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
                <div 
                  class="text-xs text-slate-200/80 text-nowrap whitespace-nowrap"
                  :class="[
                    { '!text-yellow-200': gameState.currency[gIndex][index].current !== undefined && gameState.currency[gIndex][index].maxCapacity !== undefined && gameState.currency[gIndex][index].maxCapacity <= gameState.currency[gIndex][index].current },
                  ]"
                >
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
        <div
          class="grid-area-stack-inner max-w-40 w-full pr-1"
          :class="[{'mask-fade-bg' : gameState.isPaused}]"
        >
          <template
            v-for="n in 2"
            :key="`speed_gauge_${n}`"
          >
            <div 
              class="
                max-w-[6rem] place-self-center overflow-hidden mask-fade-x
                opacity-0 transition-opacity duration-1000
                blur-[0.1rem] max-h-[1.5rem]
              "
              :class="[
                { '!opacity-100': speedLayer.activeIndex === n },
                { '!duration-500': speedLayer.activeIndex !== n }
              ]"
            >
              <div 
                class="inline-flex justify-between transition-transform duration-200 flex-nowrap animate-scroll-x w-fit scale-dynamic max-h-[1.5rem]"
                :class="[
                  { 'animation-pause': gameState.isPaused }
                ]"
                :style="`--animation-speed-duration: ${speedLayer.speeds[n][1]}s;`"
              >
                <template
                  v-for="i in 10"
                  :key="`carouse_${i}`"
                >
                  <IconSpeedBG
                    class="mx-auto self-center"
                    :class="[
                      { 'fill-orange-500/80' : gameState.isPaused },
                      { 'fill-emerald-300/80' : !(gameState.isPaused) },
                    ]"
                  />
                </template>
              </div>
            </div>
          </template>
          <article class="flex gap-2 whitespace-nowrap place-content-end w-full items-center z-10 max-h-[1.5rem]">
            <button
              class="text-emerald-300 transition-all duration-200 scale-dynamic [&>svg_[data-index='2']]:opacity-70 [&>svg_[data-index='3']]:opacity-50"
              @click="handleSpeedChange(0)"
            >
              <IconSpeedPaused
                v-if="gameState.isPaused"
                class="fill-orange-300/80 scale-[75%]"
              />
              <IconSpeedFastest v-else-if="gameState.speed[0] === 'Fastest'" />
              <IconSpeedFast v-else-if="gameState.speed[0] === 'Fast'" />
              <IconSpeedNormal
                v-else-if="gameState.speed[0] === 'Normal'"
                class="scale-[75%]"
              />
              <IconSpeedSlow
                v-else-if="gameState.speed[0] === 'Slow'"
                class="scale-[85%]"
              />
              <IconSpeedSlowest
                v-else-if="gameState.speed[0] === 'Slowest'"
                class="scale-[85%]"
              />
            </button>
            <button
              class="text-sm w-fit flex flex-col [&>*]:mx-auto [&>*]:text-xs min-w-[4rem]"
              @click="handleSpeedChange(0)"
            >
              <span
                :key="lastTick"
                class="text-slate-300 text-glow-darken mb-[-0.2rem]"
              >{{ gameState.epoch.getFullYear() }}.{{ gameState.epoch.toLocaleString('en-AU', { month: '2-digit'}) }}.{{ gameState.epoch.toLocaleString('en-AU', { day: '2-digit'}) }}</span>
              <span class="text-emerald-300">{{ gameState.isPaused ? 'Paused' : gameState.speed[0] + ' Speed' }}</span>
            </button>
            <div class="flex gap-0.5">
              <button
                class="rounded-full bg-emerald-700/40 size-[0.675rem] grid place-content-center scale-dynamic-sm overflow-clip"
                @click="handleSpeedChange(1)"
              >
                <IconPlus class="stroke-emerald-200 stroke--2 stroke-cap-round scale-[50%]" />
              </button>
              <button
                class="rounded-full bg-emerald-700/40 size-[0.675rem] grid place-content-center scale-dynamic-sm overflow-clip"
                @click="handleSpeedChange(-1)"
              >
                <IconMinus class="stroke-emerald-200 stroke--2 stroke-cap-round scale-[50%]" />
              </button>
            </div>
          </article>
        </div>
      </section>
      <div class="mr-auto mt-auto flex gap-x-2 mb-0.5 ml-0.5">
        <template
          v-for="group, gIndex in gameState.controlGroups"
          :key="`control_group_${gIndex}`"
        >
          <ControlGroup
            :type="group.type"
            :control-key="group.key"
          />
        </template>
      </div>
      <div class="mx-auto mt-auto">
        <GamePlaque
          :empire-name="gameState.empire.name"
          :empire-type="gameState.empire.type"
        >
          <template #player>
            <article class="aspect-square w-11 grid-area-stack">
              <div class="bg-clip-hexagon bg-emerald-900">
                <img
                  :src="imgPlayer"
                  class="p-0.5 size-full"
                  role="presentation"
                  alt=""
                />
              </div>
            </article>
          </template>
        </GamePlaque>
      </div>
      <div class="ml-auto mt-auto">
        Bottom Right
      </div>
    </section>
  </section>
  <Example :path="imgGame" />
</template>

<style lang="css" scoped>
  @reference "@/main.css";
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
  .scale-dynamic-sm {
    scale: calc(var(--dynamic-scale) * 0.75);
  }
  .scale-dynamic-lg {
    scale: calc(var(--dynamic-scale) * 1.25);
  }

  .mask-fade-bg {
    background: oklch(0.65 0.24 32.38 / 0.27);
    mask: linear-gradient(
      90deg,
      transparent,
      white 20%,
      white
    )
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