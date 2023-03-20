<template>
  <div class="text-white handle px-2 cursor-move flex hover:bg-blue-4 bg-blue-3">
    <div i-carbon-move></div>
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    title: String
  })
</script>
