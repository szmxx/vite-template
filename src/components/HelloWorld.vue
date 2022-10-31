<!--
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    class="text-default bg-default box-shadow-default text-base text-bold m-large border border-base border-darker border-base rt-base lh-large font-base z-base"
  >
    {{ msg }}
  </div>
  <div class="text-regular bg-primary border-light">
    {{ msg }}
  </div>
  <div class="text-secondary bg-primary-light-3 border-lighter">
    {{ msg }}
  </div>
  <div class="text-placeholder bg-primary-light-5 border-dark">
    {{ msg }}
  </div>
  <div class="text-disabled bg-primary-light-7 border-darker">
    {{ msg }}
  </div>
  <div class="text-primary bg-primary-light-9 border-primary">
    {{ msg }}
  </div>
  <div class="text-primary-light-3 bg-overlay border-primary-light-3">
    {{ msg }}
  </div>
  <div class="text-primary-light-3 bg-fill-default border-primary-light-3">
    {{ msg }}
  </div>
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
