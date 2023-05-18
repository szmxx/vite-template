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
</script>

<script lang="ts">
  import mixin from '../../mixins/index'
  defineComponent({
    name: 'CommonText',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
