<!--
 * @Author: cola
 * @Date: 2023-03-30 00:17:04
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-card v-bind="$attrs">
    <slot></slot>
  </el-card>
</template>

<script setup lang="ts"></script>

<script lang="ts">
  import mixin from '../../mixins/index'
  defineComponent({
    name: 'CommonCard',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
