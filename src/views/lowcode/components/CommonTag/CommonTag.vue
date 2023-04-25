<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-tag v-for="i in options" v-bind="$attrs" :key="i.label">{{
    i.label
  }}</el-tag>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  interface TagItem {
    label: string
    type: string
    closable: boolean
  }
  defineProps({
    options: {
      type: Array as PropType<TagItem[]>,
      default: () => [],
    },
  })
  defineOptions({
    name: 'CommonTag',
    inheritAttrs: true,
  })
</script>

<style scoped lang="scss"></style>
