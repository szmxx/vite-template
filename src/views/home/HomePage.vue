<!--
 * @Author: cola
 * @Date: 2022-07-04 19:17:18
 * @LastEditors: cola
 * @Description:
-->
<template>
  <HeaderPage></HeaderPage>
  <HelloWorld></HelloWorld>
  <SvgIcon name="user"></SvgIcon>
  <div>{{ counter }}</div>
  <button @click="increment">add</button>
  <div v-for="i in list" :key="i.name">
    {{ i.task }}
  </div>
  <div class="iconfont iconbutongguo"></div>
  <div i-carbon-3d-cursor></div>
  <img src="@/assets/logo.png" />
  <div>000000</div>
  <div>111111</div>
</template>

<script setup lang="ts">
  import HeaderPage from './components/HeaderPage.vue'
  import { getTodoList, TodoItem } from '@/api/public'
  import useStore from '@/store/counter'
  import { storeToRefs } from 'pinia'
  import SvgIcon from '@/components/SvgIcon/SvgIcon.vue'
  import { ComponentInternalInstance } from 'vue'
  const store = useStore()
  const { counter } = storeToRefs(store)
  const increment = store.increment
  const list = ref<TodoItem[]>([])
  async function fetchData() {
    for (let i = 0; i < 10; i++) {
      getTodoList()
    }
  }
  const { proxy } = getCurrentInstance() as ComponentInternalInstance
  onBeforeMount(async () => {
    await fetchData()
    console.log(proxy?.$http)
  })
</script>
