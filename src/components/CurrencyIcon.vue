<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">
  import type { CurrencyType } from '@/lib/interfaces';
  import iconGold from '@/assets/examples/Civ-7/elements/Icon_Gold.png';
  import iconCulture from '@/assets/examples/Civ-7/elements/Icon_Culture.png';
  import iconScience from '@/assets/examples/Civ-7/elements/Icon_Science.png';
  import iconHappiness from '@/assets/examples/Civ-7/elements/Icon_Happiness.png';
  import iconInfluence from '@/assets/examples/Civ-7/elements/Icon_Influence.png';


  interface IProps {
    type: CurrencyType;
  }

  const props = defineProps<IProps>();

</script>

<template>
  <div v-if="props.type === 'Gold'">
    <img
      :src="iconGold"
      role="presentation"
      alt=""
    />
  </div>
  <div v-else-if="props.type === 'Culture'">
    <img
      :src="iconCulture"
      role="presentation"
      alt=""
    />
  </div>
  <div v-else-if="props.type === 'Happiness'">
    <img
      :src="iconHappiness"
      role="presentation"
      alt=""
    />
  </div>
  <div v-else-if="props.type === 'Influence'">
    <img
      :src="iconInfluence"
      role="presentation"
      alt=""
    />
  </div>
  <div v-else-if="props.type === 'Science'">
    <img
      :src="iconScience"
      role="presentation"
      alt=""
    />
  </div>
  <div v-else>
    NULL
  </div>
</template>