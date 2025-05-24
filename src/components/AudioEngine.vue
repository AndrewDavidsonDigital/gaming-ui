
<script setup lang="ts">
  // import { useConfiguration } from '@stores/configuration';
  import { onMounted } from 'vue';
  import { 
    useBgmEngine, 
  } from '&audio';


  const bgmEngine = useBgmEngine();

  // const config = useConfiguration();

  onMounted(() => {
    // need small delay to ensure config has been loaded & init'd 
    // by the time we grab audio levels
    setTimeout(
      () => {
        bgmEngine.init('_audio_bgm');
      },
      100,
    )
  });

</script>

<template>
  <!-- eslint-disable-next-line vuejs-accessibility/media-has-caption -->
  <audio
    id="_audio_bgm"
    class="pointer-events-none"
    playsinline
    autoplay
    loop
  ></audio>
</template>
