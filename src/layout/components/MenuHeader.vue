<!--
 * @Author: cola
 * @Date: 2022-07-24 12:52:40
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="fy h-[60px] px-base">
    <div>{{ title }}</div>
  </div>
</template>

<script setup lang="ts">
  import useStore from '@/store/app'
  const { config } = useStore()
  const title = config?.title
</script>
