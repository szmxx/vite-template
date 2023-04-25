<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="text-white flex px-1 bg-blue-4 gap-x-1 z-10">
    <i i-carbon-arrow-left class="cursor-pointer" @click.stop="cancel"></i>
    <i i-carbon-arrow-up class="cursor-pointer" @click="up"></i>
    <i i-carbon-arrow-down class="cursor-pointer" @click="down"></i>
    <i i-carbon-trash-can class="cursor-pointer" @click="remove"></i>
    <i i-carbon-copy class="cursor-pointer" @click="append"></i>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['cancel', 'down', 'up', 'remove', 'copy'])
  function remove() {
    emit('remove')
  }

  function append() {
    emit('copy')
  }

  function cancel() {
    emit('cancel')
  }

  function up() {
    emit('up')
  }

  function down() {
    emit('down')
  }
</script>
