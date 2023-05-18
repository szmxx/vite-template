<!--
 * @Author: cola
 * @Date: 2023-03-30 00:22:52
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-tabs v-bind="$attrs">
    <slot></slot>
  </el-tabs>
</template>

<script setup lang="ts"></script>

<script lang="ts">
  import mixin from '../../mixins/index'
  defineComponent({
    name: 'CommonTab',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
