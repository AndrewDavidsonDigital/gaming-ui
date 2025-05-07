<!-- eslint-disable prettier/prettier -->
<script setup lang="ts">

  type SizeType = 'sm' | 'md' | 'lg';

  interface IProps {
    size: SizeType;
    banner?: string;
    cascade?: boolean;
    secondaryBorder?: boolean;
  }

  const props = defineProps<IProps>();

</script>

<template>
  <section
    class="grid-area-stack"
    :class="[
      { 'size-[4vw]' : props.size === 'lg' },
      { 'size-[3.5vw]' : props.size === 'md' },
      { 'size-[2.5vw]' : props.size === 'sm' }
    ]"
  >
    <article 
      class="
        bg-gradient-to-b from-neutral-900 to-neutral-800 
        rounded-full 
        border-2  
        z-10 
        flex justify-around
      "
      :class="[
        { '[&>*]:border-2 [&>*]:border-black/75 [&>*]:rounded-full' : props.cascade },
        { 'border-civ-gold/40' : !(props.secondaryBorder) },
        { 'border-civ-silver/40' : props.secondaryBorder }
      ]"
    >
      <slot></slot>
    </article>
    <div
      v-if="props.banner"
      class="mx-auto w-fit bg-slate-900/80 h-fit  pt-2 px-1 -my-2 z-0 text-slate-400 clipped min-w-[3ch] text-center dynamic-font-size"
      :class="[
        { 'translate-y-[4vw]' : props.size === 'lg' },
        { 'translate-y-[3.5vw]' : props.size === 'md' },
        { 'translate-y-[2.5vw]' : props.size === 'sm' },
        { 'rounded-floor-md' : props.banner.length === 2 },
        { 'rounded-floor-lg pb-1' : props.banner.length > 2 },
        { 'text-slate-400/0' : props.banner === '0'}
      ]"
    >
      {{ props.banner }}
    </div>
  </section>
</template>

<style lang="css" scoped>

  /* clip-path to render a collection of rays */
  * {
    /* --clip-path-rounded-bottom-sm: circle(80% at 50% 30%); */ /* Not needed as we force 2char min-width */
    --clip-path-rounded-bottom-md: circle(110% at 50% 0%);
    --clip-path-rounded-bottom-lg: circle(87.5% at 50% 5%);

    /* default */
    --clip-path-rounded-bottom: var(--clip-path-rounded-bottom-md);
  }

  /* .rounded-floor-sm{
    --clip-path-rounded-bottom: var(--clip-path-rounded-bottom-sm);
  } */
  .rounded-floor-md{
    --clip-path-rounded-bottom: var(--clip-path-rounded-bottom-md);
  }
  .rounded-floor-lg{
    --clip-path-rounded-bottom: var(--clip-path-rounded-bottom-lg);
  }

  .clipped{
    clip-path: var(--clip-path-rounded-bottom);
  }

</style>