<!--
 * @Author: cola
 * @Date: 2023-03-20 15:35:25
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-button v-bind="$attrs" :loading="loading">{{ label }}</el-button>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      default: '示例文本',
    },
  })
</script>

<script lang="ts">
  import runtimeMixin from './runtime'
  export default defineComponent({
    mixins: [runtimeMixin],
    inheritAttrs: false,
  })
</script>
