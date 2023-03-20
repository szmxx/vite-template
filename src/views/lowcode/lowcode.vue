<!--
 * @Author: cola
 * @Date: 2023-03-17 11:25:12
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="lowcode w-full h-full flex flex-nowrap">
    <ComponentPanel class="w-[20rem] h-full"></ComponentPanel>
    <RenderPanel class="flex-1"></RenderPanel>
    <ConfigPanel class="w-[20rem] h-full"></ConfigPanel>
  </div>
</template>

<script setup lang="ts">
import ComponentPanel from './layout/ComponentPanel.vue';
import RenderPanel from './layout/RenderPanel.vue';
import ConfigPanel from './layout/ConfigPanel.vue';
</script>


