<script setup lang="ts">

  interface IProps {
    id?: string;
  }
  const props = defineProps<IProps>();

  const model = defineModel<Boolean>();

  function update() {
    model.value = !(model.value);
  }

</script>

<template>
  <input 
    :id="props.id ? props.id : undefined"
    v-model="model" 
    type="checkbox" 
    class="hidden"
  >
  <button 
    class="
      dark:bg-slate-600 dark:outline-emerald-400 
      bg-slate-400 outline-blue-600 
      outline rounded-full 
      w-8 h-4 p-0.5 
      flex relative 
      transition-all duration-300 ease-in
      cursor-pointer
    "
    :class="[
      { 'dark:!bg-emerald-600 !bg-blue-300' : model },
    ]"
    @click="update"
  >
    <div 
      class="dark:bg-green-300 bg-blue-600 rounded-full w-3 h-3 absolute  transition-all duration-300"
      :class="[
        { 'translate-x-[130%]' : model },
      ]"
    ></div>
  </button>
</template>

<style scoped>
</style>
