<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
  import type { CurrencyType, ICurrency } from '@/lib/interfaces';
  import { computed } from 'vue';
  import CurrencyIcon from './CurrencyIcon.vue';

  interface IProps {
    displayables: ICurrency[];
  }

  interface IDisplayConfig{
    order: number;
    colour: string;
  }

  const DISPLAY_CONFIG: Readonly<Map<CurrencyType, IDisplayConfig>> = new Map<CurrencyType, IDisplayConfig>([
    ['Gold', { order: 0, colour: '--colour-civ-gold' }],
    ['Science', { order: 1, colour: '--colour-civ-science' }],
    ['Culture', { order: 2, colour: '--colour-civ-culture' }],
    ['Happiness', { order: 3, colour: '--colour-civ-happiness' }],
    ['Influence', { order: 4, colour: '--colour-civ-influence' }],
  ]);

  const props = defineProps<IProps>();

  const orderedDisplayables = computed(() => props.displayables.toSorted(currencyCompare));

  function currencyCompare(a:ICurrency, b:ICurrency) {
    return (DISPLAY_CONFIG.get(a.type)?.order || 0) - (DISPLAY_CONFIG.get(b.type)?.order || 0);
  }


</script>

<template>
  <section class="flex gap-2">
    <template
      v-for="(displayable, index) in orderedDisplayables"
      :key="`currency__${index}`"
    >
      <div 
        class="inline-flex w-fit text-nowrap restyled-text text-base"
        :style="`--colour-civ-text: var(${DISPLAY_CONFIG.get(displayable.type)?.colour})`"
      >
        <CurrencyIcon
          :type="displayable.type"
          class="size-[1.5vw]"
        />
        {{ displayable.current ? `${displayable.current} (` : null }}<span>+{{ displayable.increase }}</span> {{ displayable.current ? ')' : null }}
      </div>
    </template>
    
    <slot></slot>
  </section>
</template>

<style lang="css" scoped>
  * {
    --colour-civ-gold: oklch(0.77 0.14 91.04);
    --colour-civ-science: oklch(0.65 0.15 240);
    --colour-civ-culture: oklch(0.65 0.15 280);
    --colour-civ-happiness: oklch(0.75 0.12 80);
    --colour-civ-influence: oklch(0.85 0.08 140);
  }

  .restyled-text {
    color: var(--colour-civ-text);
  }

</style>