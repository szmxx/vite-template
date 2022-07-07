<!--
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div>{{ msg }}</div>
  <div>
    <button @click="greet">greet</button>
  </div>
</template>

<script setup lang="ts">
  import useStore from '@/store/demo'
  const store = useStore()
  const { msg } = storeToRefs(store)
  const greet = () => {
    msg.value = 'greeting'
    store.greet()
  }
</script>

<style scoped lang="scss">
  div {
    color: $black;
  }
</style>
