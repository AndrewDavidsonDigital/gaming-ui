<script setup lang="ts">
  import { computed, ref } from 'vue';  
  import { type ActionType, type ICurrency } from '@/lib/interfaces';
  import Example from '@/components/Example.vue';
  import imgGame from '@/assets/examples/Civ-7/GameUI.png'
  import imgBG from '@/assets/examples/Civ-7/BG.png'
  import IngameCurrency from '@/components/IngameCurrency.vue';
  import CityCapacity from '@/components/CityCapacity.vue';
  import IconButton from '@/components/IconButton.vue';
  import ActionIcon from '@/components/ActionIcon.vue';

  import imgAgeFlourish from '@/assets/examples/Civ-7/elements/Age_Flourish.png';

  type AgeType = 'Antiquity' | 'Exploration' | 'Modern';
  type GameSpeedType = ['marathon', 2] |['long', 5] | ['average', 10] | ['short', 25] | ['quick', 50];

  interface IGameSpeed {
    name: string;
    turnDuration: number;
  }

  interface IAge {
    name: AgeType;
    turnNumber: number;
    progress: number;
    crisisBreakpoints: number[];
    gameSpeed: GameSpeedType;
  }

  interface IGameState {
    age: IAge;
    science: IResearch;
    culture: IResearch;
    currency: ICurrency[];
    bannerNotifications: INoteConfig[];
  }

  interface IResearch {
    name: string;
    currentInvestment: number;
    totalInvestment: number;
  }

  interface INoteConfig {
    type: ActionType;
    banner?: string;
  }

  const currentAge = computed(() => 4000 - (gameState.value.age.turnNumber * gameState.value.age.gameSpeed[1]));

  const gameState = ref<IGameState>({
    age: {
      name: 'Antiquity',
      progress: 13,
      turnNumber: 25,
      crisisBreakpoints: [
        60,
        80,
        90
      ],
      gameSpeed: [
        'marathon',
        2
      ]
    },
    culture: {
      name: 'Ideology',
      currentInvestment: 13,
      totalInvestment: 95,
    },
    science: {
      name: 'init',
      currentInvestment: 0,
      totalInvestment: 0,
    },
    currency: [
    {
      type: 'Gold',
      increase: 3,
      current: 5
    },
    {
      type: 'Happiness',
      increase: 10
    },
    {
      type: 'Culture',
      increase: 10
    },
    {
      type: 'Science',
      increase: 15,
    },
    {
      type: 'Influence',
      increase: 15,
      current: 30
    },
    ],
    bannerNotifications: [
      { type: 'Notes', banner: '13' },
      { type: 'Nature' },
      { type: 'Urn' },
      { type: 'Diplomacy' },
      { type: 'Lock' },
      { type: 'World' }
    ]
  });

  function resolveBanner(type: 'science' | 'culture'){
    const rate = (gameState.value.currency.find(e=>e.type.toLowerCase() === type)?.increase || 0);
    const researchRemaining = (gameState.value[type].totalInvestment - gameState.value[type].currentInvestment);

    return `${Math.ceil(researchRemaining/rate)}`;
  }
</script>

<template>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] bg-slate-800 mx-auto rounded-md p-4 flex flex-col"
  >
    <details>
      <summary class="text-xl font-semibold">
        Game-State:
      </summary>

    
      <template
        v-for="key,gs_index in Object.keys(gameState)"
        :key="`game-state_${gs_index}`"
      >
        <details>
          <summary class="text-lg font-semibold capitalize">
            {{ key }}
          </summary>
          <template v-if="key === 'bannerNotifications'">
            <template
              v-for="el,note_key_index in gameState[key]"
              :key="`game-state_notifications_${gs_index}_${note_key_index}`"
            >
              <label class="mx-auto grid grid-cols-2 gap-10 mb-2">
                <span class="text-right">Type: </span>
                <span>{{ el.type }}</span>
              </label>
              <label class="mx-auto grid grid-cols-2 gap-10 mb-2">
                <span class="text-right">Amount of notes: </span>
                <input
                  v-model="el.banner"
                  type="string"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                  min="0"
                />
              </label>
            </template>
          </template>
          <template v-else-if="key === 'currency'">
            <template
              v-for="el,note_key_index in gameState[key]"
              :key="`game-state_notifications_${gs_index}_${note_key_index}`"
            >
              <label class="mx-auto grid grid-cols-2 gap-10 mb-2">
                <span class="text-right">Type: </span>
                <span>{{ el.type }}</span>
              </label>
              <label class="mx-auto grid grid-cols-2 gap-10 mb-2">
                <span class="text-right">Inc: </span>
                <input
                  v-model="el.increase"
                  type="number"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                  min="0"
                />
              </label>
              <label
                v-if="['gold', 'influence'].indexOf(el.type.toLowerCase()) !== -1"
                class="mx-auto grid grid-cols-2 gap-10 mb-2"
              ><span class="text-right">Stock: </span>
                <input
                  v-model="el.current"
                  type="number"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                  min="0"
                />
              </label>
            </template>
          </template>
          <template
            v-for="el,ge_key_index in Object.keys(gameState[key])"
            v-else
            :key="`game-state_${gs_index}_${ge_key_index}`"
          >
            <label class="mx-auto grid grid-cols-2 gap-10 mb-2"><span class="text-right">{{ el }}</span>
              <template v-if="['progress','turnNumber', 'currentInvestment', 'totalInvestment'].indexOf(el) !== -1">
                <input
                  v-model="gameState[key][el]"
                  type="number"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                  min="0"
                />
              </template>
              <template v-else-if="['crisisBreakpoints'].indexOf(el) !== -1">
                <input
                  :value="gameState[key][el].join(',')"
                  type="array"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                  min="0"
                  @input="((e: Event) => gameState[key][el] = e.target.value.split(','))"
                  @change="((e: Event) => gameState[key][el] = e.target.value.split(','))"
                />
              </template>
              <template v-else-if="['gameSpeed'].indexOf(el) !== -1">
                <select
                  :value="gameState[key][el]"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                  @input="((e: Event) => gameState[key][el] = e.target.value.split(',').map((el, i) => i===1 ? Number(el) : el))"
                  @change="((e: Event) => gameState[key][el] = e.target.value.split(',').map((el, i) => i===1 ? Number(el) : el))"
                >
                  <option>marathon,2</option>
                  <option>long,5</option>
                  <option>average,15</option>
                  <option>short,25</option>
                  <option>quick,50</option>
                </select>
              </template>
              <template v-else>
                <input
                  v-model="gameState[key][el]"
                  type="string"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                />
              </template>
            </label>
          </template>
        </details>
      </template>
    </details>
  </section>
  <section
    id="ConstrainedCanvas"
    class="w-[80vw] aspect-video bg-slate-500 mx-auto mt-[2vw]"
  >
    <section>
      <!-- Top Banner -->
      <div
        class="
          w-full 
          self-start px-2
          flex justify-between
          bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900
        "
      >
        <div>
          <IngameCurrency :displayables="gameState.currency">
            <CityCapacity
              :current="3"
              :max="5"
            />
          </IngameCurrency>
        </div>
        <div class="dynamic-font-size flex gap-2 text-slate-400">
          <span>Turn: {{ gameState.age.turnNumber }} | {{ currentAge }} BCE</span>
          <span class="uppercase">{{ (new Date(Date.now())).toLocaleString("en-AU", {timeStyle: "short"}) }}</span>
        </div>
      </div>
    </section>

    <!-- Inner UI  -->
    <section class="grid-area-stack size-full overflow-clip">
      <img
        :src="imgBG"
        class="size-full"
        role="presentation"
        alt=""
      />
      <div class="ml-[2vw] mt-[1vw] flex gap-[0.5vw] items-center h-fit">
        <IconButton
          size="lg"
          :banner="`${gameState.age.progress}%`"
          class="
            relative
            
            before:absolute 
            before:bg-stone-900 before:size-[4.55vw] 
            before:-left-[0.25vw] before:-top-[0.3vw]
            before:rounded-full
          "
        >
          <img
            :src="imgAgeFlourish"
            alt=""
            role="presentation"
            class="absolute left-[-1.5vw] size-[120%] -translate-y-1/2 top-1/2"
          />
          <template
            v-for="(crisis, index) in gameState.age.crisisBreakpoints"
            :key="`crisis_${index}`"
          >
            <div
              class="absolute size-[95%] bottom-[0.1vw] origin-center rotate-[var(--rotation-percentage)]"
              :style="`--rotation-percentage: ${crisis*3.6 + 45 + 180}deg;`"
            >
              <div
                :data-percentage="crisis"
                class="
                  scale-[75%]
                  size-[0.5vw]
                  rounded-full
                  bg-red-700
                  blur-[0.025vw]
                  relative
                  z-10

                  before:absolute before:size-full before:rounded-full before:z-10
                  before:border-2 before:p-[0.4vw] before:translate-[-0.25vw] before:border-civ-brand

                  after:absolute after:size-full after:bg-civ-gold after:translate-[0.3vw] after_clip-triangle
                "
              ></div>
            </div>
          </template>
          <ActionIcon
            type="Age" 
            size="lg"
            :progress="gameState.age.progress"
          />
        </IconButton>
        <IconButton
          size="md"
          :banner="resolveBanner('science')"
          :title="gameState.science.name"
        >
          <ActionIcon
            type="Science" 
            size="md"
            :progress="(gameState.science.currentInvestment/gameState.science.totalInvestment) * 100"
          />
        </IconButton>
        <IconButton
          size="md"
          :banner="resolveBanner('culture')"
          :title="gameState.culture.name"
        >
          <ActionIcon
            type="Culture" 
            size="md"
            :progress="(gameState.culture.currentInvestment/gameState.culture.totalInvestment) * 100"
          />
        </IconButton>
        <template
          v-for="(note, index) in gameState.bannerNotifications"
          :key="`notes_${index}`"
        >
          <IconButton
            size="sm"
            :banner="note.banner"
            cascade
            secondary-border
            :title="note.type"
          >
            <ActionIcon
              :type="note.type"
              size="sm"
            />
          </IconButton>
        </template>
      </div>
      <div class="ml-auto">
        Top Right
      </div>
      <div class="mt-auto bg-neutral-900 aspect-video w-[15vw] ml-2 mb-2 border border-amber-700">
        <div class="mx-auto -mt-3 size-4 border border-slate-500 rounded-full text-xs text-white text-center bg-slate-700">
          S
        </div>
      </div>
      <div class="ml-auto mt-auto">
        Bottom Right
      </div>
    </section>
  </section>
  <Example :path="imgGame" />
</template>

<style lang="css" scoped>

  .after_clip-triangle::after {
    clip-path: polygon(90% 0%, 0% 90%, 100% 100%)
  }

</style>