<script setup lang="ts">
  import type { ControlType, ControlKeyType } from '@/lib/interfaces';
  import iconMilitary from '@/assets/examples/Stellaris/elements/ControlGroups_Military.png';
  import iconPlanet from '@/assets/examples/Stellaris/elements/ControlGroups_Planet.png';
  import iconCivilian from '@/assets/examples/Stellaris/elements/ControlGroups_Civil.png';
  import iconOther from '@/assets/examples/Stellaris/elements/ControlGroups_Other.png';

  interface IProps {
    type: ControlType;
    controlKey: ControlKeyType;
  }
  const props = defineProps<IProps>();


</script>

<template>
  <button 
    class="
      text-xs text-slate-200 
      border border-transparent
      dynamic-bg
      grid-area-stack
      transition-all

      hover:border-t-amber-500
      hover:!bg-amber-700/40

      group
    " 
    :class="[
      { 'border-t-red-300/50' : props.type === 'Military' },
      { 'border-t-emerald-300/50' : props.type === 'Planet' },
      { 'border-t-amber-300/50' : props.type === 'Civilian' },
      { 'border-t-blue-300/50' : props.type === 'Other' },
    ]"
    :style="
      props.type === 'Military' ? '--bg-colour: oklch(57.7% 0.245 27.325)' : 
      props.type === 'Civilian' ? '--bg-colour: oklch(66.6% 0.179 58.318)' :
      props.type === 'Planet' ? '--bg-colour: oklch(59.6% 0.145 163.225)' :
      props.type === 'Other' ? '--bg-colour: oklch(54.6% 0.245 262.881)' : 
      ''
    "
  >
    <div class="mb-auto h-1 w-full border-l border-r border-t border-amber-500/0 group-hover:border-amber-500 transition-all duration-300">
    </div>
    <div class="mt-auto mr-auto size-1 border-l border-b border-amber-500/0 group-hover:border-amber-500 transition-all duration-300">
    </div>
    <div class="mt-auto ml-auto size-1 border-r border-b border-amber-500/0 group-hover:border-amber-500 transition-all duration-300">
    </div>
    <div class="flex gap-1 items-center px-1">
      <p>{{ props.controlKey }}</p>
      <img
        v-if="props.type === 'Military'"
        :src="iconMilitary"
        class="size-4"
        role="presentation"
        alt=""
      />
      <img
        v-else-if="props.type === 'Planet'"
        :src="iconPlanet"
        class="size-4"
        role="presentation"
        alt=""
      />
      <img
        v-else-if="props.type === 'Civilian'"
        :src="iconCivilian"
        class="size-4"
        role="presentation"
        alt=""
      />
      <img
        v-else-if="props.type === 'Other'"
        :src="iconOther"
        class="size-4"
        role="presentation"
        alt=""
      />
    </div>
  </button>
</template>

<style scoped>
  * {
    --bg-colour: oklch(57.7% 0.245 27.325);
  }

  .dynamic-bg {
    background: repeating-linear-gradient(
      color-mix(in oklab, var(--bg-colour) 20%, transparent) 0,
      color-mix(in oklab, var(--bg-colour) 20%, transparent) max(0.05rem, 1px),
      color-mix(in oklab, var(--bg-colour) 5%, transparent) max(0.05rem, 3px)
    );
  }

</style>
