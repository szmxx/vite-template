<!--
 * @Author: cola
 * @Date: 2022-07-06 16:21:44
 * @LastEditors: cola
 * @Description:
-->
<template>
  <svg aria-hidden="true">
    <use :href="symbolId" />
  </svg>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  defineOptions({
    name: 'SvgIcon',
  })
  const props = defineProps({
    name: {
      type: String,
      required: true,
    },
  })
  const symbolId = computed(() => `#icon-${props.name}`)
</script>

<style lang="scss" scoped>
  svg {
    width: 1em;
    height: 1em;
    fill: currentcolor;
  }
</style>
