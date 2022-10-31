<template>
  <div class="w-[1em] h-[1em]" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    color: {
      type: String,
      default: '',
    },
  })
  const style = computed(() => {
    return {
      color: props.color,
    }
  })
</script>
