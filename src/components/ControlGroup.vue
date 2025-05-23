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
      grid-area-stack

      hover:border-t-amber-500
      hover:bg-amber-700/40

      group
    " 
    :class="[
      { 'bg-red-600/20 border-t-red-300/50' : props.type === 'Military' },
      { 'bg-emerald-600/20 border-t-emerald-300/50' : props.type === 'Planet' },
      { 'bg-amber-600/20 border-t-amber-300/50' : props.type === 'Civilian' },
      { 'bg-blue-600/20 border-t-blue-300/50' : props.type === 'Other' },
    ]"
  >
    <div class="mb-auto h-1 w-full group-hover:border-l group-hover:border-r group-hover:border-t group-hover:border-amber-500">
    </div>
    <div class="mt-auto mr-auto size-1 group-hover:border-l group-hover:border-b group-hover:border-amber-500">
    </div>
    <div class="mt-auto ml-auto size-1 group-hover:border-r group-hover:border-b group-hover:border-amber-500">
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
</style>
