<!--
 * @Author: cola
 * @Date: 2023-03-20 15:45:34
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-link v-bind="$attrs">{{ label }}</el-link>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      default: '示例文本',
    },
  })
  defineOptions({
    name: 'CommonLink',
    inheritAttrs: true,
  })
</script>
