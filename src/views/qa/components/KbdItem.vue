<!--
 * @Author: cola
 * @Date: 2023-01-03 14:24:54
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="flex flex-nowrap items-center">
    <kbd center>
      <slot></slot>
    </kbd>
    <span v-if="text">{{ text }}</span>
  </div>
</template>
<script setup lang="ts">
  defineProps({
    text: {
      type: String,
      default: '',
    },
  })
</script>

<style lang="scss" scoped>
  kbd {
    margin-right: 0.4em;
    border: none;
    border-radius: 2px;
    width: 20px;
    height: 18px;
    color: #909399;
    background: rgb(125 125 125 / 10%);
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px rgb(30 35 90 / 40%);
  }

  span {
    font-size: 0.75em;
    color: #909399;
    line-height: 1.6em;
  }
</style>
