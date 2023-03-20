
<template>
  <div class="text-white flex px-2 bg-blue-4 gap-x-2">
    <i i-carbon-trash-can class="cursor-pointer" @click="remove"></i>
    <i i-carbon-copy class="cursor-pointer" @click="append"></i>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(['remove', 'append'])
  function remove() {
    emit("remove")
  }

  function append() {
    emit("append")
  }
</script>
