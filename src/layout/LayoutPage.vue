<!--
 * @Author: cola
 * @Date: 2022-07-05 16:16:23
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="layout flex flex-nowrap h-full w-full">
    <div class="w-[220px] bg-darker">
      <LeftMenu></LeftMenu>
    </div>
    <div class="flex flex-col flex-1 border-l border-darker">
      <div class="flex items-center h-[60px] border-b border-darker">
        <slot>LAYOUT HEADER</slot>
      </div>
      <div class="flex-1">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LeftMenu from './components/LeftMenu.vue'
</script>
