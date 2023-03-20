<!--
 * @Author: cola
 * @Date: 2023-03-20 15:36:51
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-cascader v-bind="$attrs" />
</template>

<script setup lang="ts">
  defineOptions({
    name: 'CommonCascader',
    inheritAttrs: true,
  })
</script>
