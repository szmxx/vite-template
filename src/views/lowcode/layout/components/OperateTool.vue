<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div @click.stop="opHandler" class="absolute right-1px bottom-1px text-white flex px-1 bg-blue-4 gap-x-1 z-10">
    <i i-carbon-row class="cursor-pointer" v-show="isGrid" data-type="row"></i>
    <i i-carbon-column class="cursor-pointer" v-show="isRow" data-type="column"></i>
    <i i-carbon-arrow-left class="cursor-pointer" data-type="cancel"></i>
    <i i-carbon-arrow-up class="cursor-pointer" data-type="up"></i>
    <i i-carbon-arrow-down class="cursor-pointer" data-type="down"></i>
    <i i-carbon-trash-can class="cursor-pointer" data-type="remove"></i>
    <i i-carbon-copy class="cursor-pointer" data-type="copy"></i>
  </div>
</template>

<script setup lang="ts">
  // type IOperateEvent = 'cancel' | 'down' | 'up' | 'remove' | 'copy' | 'column' | 'row'
  defineProps({
    isRow: {
      type: Boolean,
      default: false
    },
    isGrid: {
      type: Boolean,
      default: false,
    }
  })
  const emit = defineEmits(['cancel', 'down', 'up', 'remove', 'copy', 'column', 'row'])
  function opHandler(evt: MouseEvent){
    const type = (evt.target as HTMLElement).dataset.type
    emit(type)
  }
</script>
