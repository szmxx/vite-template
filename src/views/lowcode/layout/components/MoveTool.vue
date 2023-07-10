<!--
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
-->
<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    class="absolute text-white scale-80 transform-origin-left-top handle px-1 cursor-move flex items-center gap-x-1 hover:bg-blue-4 bg-blue-3 z-10"
  >
    <div v-if="isShowMove" i-carbon-move></div>
    <span>{{ title }}</span>
  </div>
</template>

<script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: '',
    },
    isShowMove: {
      type: Boolean,
      default: true,
    },
  })
</script>
