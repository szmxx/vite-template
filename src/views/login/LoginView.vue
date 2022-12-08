<!--
 * @Author: cola
 * @Date: 2022-12-01 10:19:51
 * @LastEditors: cola
 * @Description: 交互和趣味性
-->
<template>
  <div class="w-full h-full flex">
    <div class="flex-1 h-full">
      <img class="w-full h-full" src="@/assets/img/login.JPG" />
    </div>
    <div class="w-[30%]">
      <div></div>
    </div>
    <div v-drag class="float-btn absolute w-10 h-10 bg-blue cursor-move">
      home
    </div>
  </div>
</template>

<script setup></script>

<style lang="scss">
  .float-btn {
    transform: translate(calc(100vw - 4rem), calc(100vh - 4rem));
  }
</style>
