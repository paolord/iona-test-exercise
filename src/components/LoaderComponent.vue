<script setup lang="ts">
  import { withDefaults } from 'vue'

  interface Props {
    size?: number
  }
  const props = withDefaults(defineProps<Props>(), {
    size: 32
  })
</script>

<template>
  <img :style="{ 'width': `${props.size}px`, 'height': `${props.size}px` }" src="@/assets/loader.gif">
</template>
