<!--
 * @Author: cola
 * @Date: 2022-12-22 14:13:17
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-form-item>
    <component :is="data.component"></component>
  </el-form-item>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import { FormItem } from './types'

  defineProps({
    data: {
      type: Object as PropType<FormItem>,
      default: () => {
        // pass
      },
    },
  })
</script>
