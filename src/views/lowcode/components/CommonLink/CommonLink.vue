<!--
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
-->
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
</script>

<script lang="ts">
  import mixin from '../../mixins/index'
  defineComponent({
    name: 'CommonLink',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
