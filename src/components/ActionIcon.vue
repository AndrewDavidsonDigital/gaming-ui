<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
  import type { ActionType, SizeType } from '@/lib/interfaces';
  import iconNotes from '@/assets/examples/Civ-7/elements/Icon_Notes.png';
  import iconNature from '@/assets/examples/Civ-7/elements/Icon_Leaf.png';
  import iconDiplomacy from '@/assets/examples/Civ-7/elements/Icon_Dove.png';
  import iconUrn from '@/assets/examples/Civ-7/elements/Icon_Urn.png';
  import iconLock from '@/assets/examples/Civ-7/elements/Icon_Lock.png';
  import iconWorld from '@/assets/examples/Civ-7/elements/Icon_World.png';

  import iconScience from '@/assets/examples/Civ-7/elements/Button_Science.png';
  import iconCulture from '@/assets/examples/Civ-7/elements/Button_Culture.png';
  import iconAge from '@/assets/examples/Civ-7/elements/Button_Age.png';


  const resolver = {
    "Notes": iconNotes,
    "Nature": iconNature,
    "Diplomacy": iconDiplomacy,
    "Urn": iconUrn,
    "Lock": iconLock,
    "World": iconWorld,

    "Culture": iconCulture,
    "Science": iconScience,
    "Age": iconAge,
  }


  interface IProps {
    type: ActionType;
    size: SizeType;
    progress?: number;
  }

  const props = defineProps<IProps>();

  function resolveProgressColour(foo: ActionType){
    switch (foo) {
      case 'Culture':
        return '--progress-colour: oklch(52% 0.223 3.958)';
      case 'Science':
        return '--progress-colour: oklch(60% 0.09 240.876)';
      case 'Age':
        return '--progress-colour: var(--color-civ-gold)';
    
      default:
        break;
    }
  }

</script>

<template>
  <div
    class="size-full grid items-center justify-items-center rounded-full self-center"
    :class="[
      { 'bg-gradient-to-b from-fuchsia-900 via-transparent to-fuchsia-900' : props.type === 'Culture' },
      { 'bg-gradient-to-b from-slate-900 to-slate-700' : props.type === 'Science' },
      { 'bg-gradient-to-b from-stone-900 to-stone-700' : props.type === 'Age' },
      { '!size-4/5 progress' : ['Culture', 'Science', 'Age'].indexOf(props.type) !== -1 },
    ]"
    :style="[
      resolveProgressColour(props.type),
      `--progress-percentage: ${props.progress || 0}%`,
    ]"
  >
    <img
      :src="resolver[props.type]"
      :class="[
        { 'size-[1.5vw]': props.size === 'sm' },
        { 'size-[2.5vw]': props.size === 'md' },
        { 'size-[3vw]': props.size === 'lg' },
      ]"
      role="presentation"
      alt=""
    />
  </div>
</template>

<style lang="css" scoped>
  *{
    --progress-colour: #ffffff00;
    --progress-translucent: #ffffff00;
    --progress-percentage: 0%;
  }

  .progress{
    @apply relative;
  }

  .progress::before{
    @apply rotate-180;
    @apply absolute;
    @apply size-[110%];
    content: '';

    background: conic-gradient(
      var(--progress-colour) var(--progress-percentage),
      var(--progress-translucent) var(--progress-percentage) 100%
    );

    @apply -z-10;
    @apply rounded-full;
  }
</style>