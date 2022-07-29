<!--
 * @Author: cola
 * @Date: 2022-07-24 17:21:29
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="w-full h-full absolute top-0 left-0 center bg-[rgba(0,0,0,0.5)]">
    <div class="loading i-mdi-loading text-primary text-extra-large"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
  .loading {
    animation: 2s rotate infinite;
  }
</style>
