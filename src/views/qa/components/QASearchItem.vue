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
  const props = defineProps({
    data: {
      type: Object as PropType<IQAItem>,
      default: () => {
        // pass
      },
    },
    inputVal: {
      type: String,
      default: '',
    },
  })
  // er '123er23345612345' => 'er'
  let totalLength = 30
  computed(() => {
    totalLength = totalLength - props.inputVal.length
    const index = props.data.answer.indexOf(props.inputVal)
    const startIndex = Math.max(index - 10, 0)
    const endIndex = Math.max(index + 10)
    // eslint-disable-next-line no-console
    console.info(endIndex)
    if (index !== -1) {
      return props.data.answer.slice(startIndex - 10, startIndex + 10)
    }
  })
</script>
