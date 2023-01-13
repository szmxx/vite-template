<!--
 * @Author: cola
 * @Date: 2022-12-21 10:30:02
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-button v-bind="$attrs" @click="clickHandler">
    <slot></slot>
  </el-button>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'GlobalButton',
    inheritAttrs: true,
  })
  const emit = defineEmits(['click'])

  function clickHandler() {
    emit('click')
  }
</script>
