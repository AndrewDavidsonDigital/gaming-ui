<script setup lang="ts">
  import { computed, ref } from 'vue';  
  import { type ActionType, type DiplomacyStateType, type IColouration, type ICurrency } from '@/lib/interfaces';
  import Example from '@/components/Example.vue';
  import IngameCurrency from '@/components/IngameCurrency.vue';
  import CityCapacity from '@/components/CityCapacity.vue';
  import IconButton from '@/components/IconButton.vue';
  import ActionIcon from '@/components/ActionIcon.vue';
  import AgeIconButton from '@/components/AgeIconButton.vue';
  import SwitchToggle from '@/components/SwitchToggle.vue';
  import CharacterBanner from '@/components/CharacterBanner.vue';

  import imgGame from '@/assets/examples/Civ-7/GameUI.png'
  import imgBG from '@/assets/examples/Civ-7/BG.png'
  import imgIcon2K from '@/assets/examples/Civ-7/elements/Icon_2k.png';
  import imgBook from '@/assets/examples/Civ-7/elements/Icon_Book.png';
  import imgMenu from '@/assets/examples/Civ-7/elements/Icon_Menu.png';

  type AgeType = 'Antiquity' | 'Exploration' | 'Modern';
  type GameSpeedType = ['marathon', 2] |['long', 5] | ['average', 10] | ['short', 25] | ['quick', 50];
  type GameStateKey = keyof typeof gameState.value;

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
    opponents: IOpponent[];
    player: IPlayer;
  }

  interface IResearch {
    name: string;
    currentInvestment: number;
    totalInvestment: number;
  }

  interface ICiv {
    ruler: string;
    civilization: string;
    colours: IColouration;
  }

  interface IPlayer extends ICiv {
    tbd?: string;
  }

  interface IOpponent extends ICiv {
    isKnown: boolean;
    relationship: DiplomacyStateType;
  }

  interface INoteConfig {
    type: ActionType;
    banner?: string;
  }

  const currentAge = computed(() => 4000 - (gameState.value.age.turnNumber * gameState.value.age.gameSpeed[1]));
  const knownOpponents = computed(() => gameState.value.opponents.filter(el => el.isKnown));

  interface IAccountState {
    '2k': {
      connected: boolean;
    }
  }

  const accountState = ref<IAccountState>({
    '2k': {
      connected: false,
    }
  })

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
    ],
    opponents: [
      {
        ruler: 'Ceaser',
        civilization: 'Rome',
        isKnown: true,
        relationship: 'Friendly',
        colours: {
          main: 'Orange',
          alpha: 0.6
        }
      },
      {
        ruler: 'Confucius',
        civilization: 'China',
        isKnown: false,
        relationship: 'Neutral',
        colours: {
          main: 'Cyan',
          alpha: 0.6
        }
      },
      {
        ruler: 'Quetzalcoatl',
        civilization: 'Maya',
        isKnown: true,
        relationship: 'Antagonistic',
        colours: {
          main: 'Green',
          alpha: 0.6
        }
      }
    ],
    player: {
      civilization: 'Atlantas',
      ruler: 'Benjamin Franklin',
      colours: {
        main: 'Red',
        alpha: 0.6
      }
    }
  });

  function resolveBanner(type: 'science' | 'culture'){
    const rate = (gameState.value.currency.find(e=>e.type.toLowerCase() === type)?.increase || 0);
    const researchRemaining = (gameState.value[type].totalInvestment - gameState.value[type].currentInvestment);

    return `${Math.ceil(researchRemaining/rate)}`;
  }

  function handleGameStateInput(key: GameStateKey, el: string, e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target) return;
    
    const stateObj = gameState.value[key] as Record<string, any>;
    
    if (el === 'progress') {
      stateObj[el] = Math.min(Number(target.value), 100);
    } else {
      stateObj[el] = target.value;
    }
  }

  function handleArrayInput(key: GameStateKey, el: string, e: Event) {
    const target = e.target as HTMLInputElement;
    if (!target) return;
    
    const stateObj = gameState.value[key] as Record<string, any>;
    stateObj[el] = target.value.split(',');
  }

  function handleGameSpeedInput(key: GameStateKey, el: string, e: Event) {
    const target = e.target as HTMLSelectElement;
    if (!target) return;
    
    const stateObj = gameState.value[key] as Record<string, any>;
    stateObj[el] = target.value.split(',').map((val, i) => i === 1 ? Number(val) : val);
  }
</script>

<template>
  <section
    id="AccountState"
    class="w-[80vw] bg-slate-800 mx-auto rounded-md p-4 flex flex-col"
  >
    <details>
      <summary class="text-xl font-semibold">
        Account-State:
      </summary>

    
      <template
        v-for="key,gs_index in Object.keys(accountState)"
        :key="`account-state_${gs_index}`"
      >
        <details>
          <summary class="text-lg font-semibold capitalize">
            {{ key }}
          </summary>
          <template
            v-for="el,ge_key_index in Object.keys(accountState[key])"
            :key="`game-state_${gs_index}_${ge_key_index}`"
          >
            <label class="mx-auto grid grid-cols-2 gap-10 mb-2 items-center"><span class="text-right">{{ el }}</span>
              <template v-if="['connected'].indexOf(el) !== -1">
                <SwitchToggle v-model="accountState[key][el]">
                </switchtoggle></template>
              <template v-else>
                <input
                  v-model="accountState[key][el]"
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
    id="GameState"
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
                  :max="el === 'progress' ? 100 : undefined"
                  @input="(e: Event) => handleGameStateInput(key as GameStateKey, el, e)"
                  @change="(e: Event) => handleGameStateInput(key as GameStateKey, el, e)"
                />
              </template>
              <template v-else-if="['crisisBreakpoints'].indexOf(el) !== -1">
                <input
                  :value="gameState[key][el].join(',')"
                  type="array"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                  min="0"
                  @input="(e: Event) => handleArrayInput(key as GameStateKey, el, e)"
                  @change="(e: Event) => handleArrayInput(key as GameStateKey, el, e)"
                />
              </template>
              <template v-else-if="['gameSpeed'].indexOf(el) !== -1">
                <select
                  :value="gameState[key][el]"
                  class="border border-emerald-600 rounded-md px-2 max-w-40"
                  @input="(e: Event) => handleGameSpeedInput(key as GameStateKey, el, e)"
                  @change="(e: Event) => handleGameSpeedInput(key as GameStateKey, el, e)"
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
    <!-- Top Banner -->
    <section
      class="
          self-start px-2
          flex justify-between
          bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900
          w-full
        "
    >
      <IngameCurrency :displayables="gameState.currency">
        <CityCapacity
          :current="3"
          :max="5"
        />
      </IngameCurrency>
      <article class="flex gap-2 whitespace-nowrap place-content-end w-full items-center">
        <div class="dynamic-font-size-0.875 flex gap-[2vw] text-slate-400 w-fit">
          <span>Turn: {{ gameState.age.turnNumber }} | {{ currentAge }} BCE</span>
          <span class="uppercase">{{ (new Date(Date.now())).toLocaleString("en-AU", {timeStyle: "short"}) }}</span>
        </div>
        <div class="inline-flex items-center gap-2">
          <div class="grid-area-stack size-[1vw]">
            <img
              :src="imgIcon2K"
              alt=""
              role="presentation"
              class="aspect-square "
            />
            <div
              class="bg-red-600 rounded-full size-2/5 ml-auto translate-x-[0.1vw] -translate-y-[0.1vw]"
              :class="[
                { '!bg-emerald-300' : accountState['2k'].connected },
              ]"
            ></div>
          </div>
          <img
            :src="imgBook"
            alt=""
            role="presentation"
            class="size-[1vw]"
          />
          <img
            :src="imgMenu"
            alt=""
            role="presentation"
            class="size-[1vw]"
          />
        </div>
      </article>
    </section>

    <!-- Inner UI  -->
    <section class="grid-area-stack size-full overflow-clip">
      <img
        :src="imgBG"
        class="size-full"
        role="presentation"
        alt=""
      />
      <div class="ml-[2vw] mt-[1vw] flex gap-[0.5vw] items-center h-fit w-fit">
        <AgeIconButton
          :progress="gameState.age.progress"
          :crises="gameState.age.crisisBreakpoints"
        >
          <ActionIcon
            type="Age" 
            size="lg"
            :progress="gameState.age.progress"
          />
        </AgeIconButton>
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
      <div
        class="ml-auto mt-[1vw] mr-[5vw] gap-[1vw] h-fit grid grid-cols-n"
        :style="`--column-count: ${1 + knownOpponents.length};`"
      >
        <CharacterBanner
          :ruler="gameState.player.ruler"
          :civ="gameState.player.civilization"
          :colour="gameState.player.colours"
        />
        <template
          v-for="(opponent, index) in knownOpponents"
          :key="`opponent_${index}`"
        >
          <CharacterBanner
            :ruler="opponent.ruler"
            :civ="opponent.civilization"
            :relationship="opponent.relationship"
            :colour="opponent.colours"
          />
        </template>
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
  * {
    --column-count: 1;
  }

  .grid-cols-n {
    grid-template-columns: repeat(var(--column-count), minmax(0, 1fr));
  }
</style>