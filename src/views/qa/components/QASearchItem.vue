<!--
 * @Author: cola
 * @Date: 2022-12-22 15:16:33
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="qa-search-item flex flex-col">
    <div class="qa-search-item-header">{{ data.name }}</div>
    <div class="qa-search-item-content">{{ data.answer }}</div>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import { IQAItem } from '../types'
  defineProps({
    data: {
      type: Object as PropType<IQAItem>,
      default: () => {},
    },
  })
</script>
