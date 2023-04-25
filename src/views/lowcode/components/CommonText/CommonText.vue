<!--
 * @Author: cola
 * @Date: 2023-03-20 16:04:38
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-text v-bind="$attrs">{{ label }}</el-text>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      default: '示例文本',
    },
  })
  defineOptions({
    name: 'CommonText',
    inheritAttrs: true,
  })
</script>
