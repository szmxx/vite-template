<!--
 * @Author: weicong
 * @LastEditors: cola
 * @Description:
 * @Date: 2021-12-12 13:19:36
 * @LastEditTime: 2022-07-06 16:57:41
 * @FilePath: \vite-project\src\components\SvgIcon\SvgIcon.vue
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
