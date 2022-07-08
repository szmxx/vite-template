<!--
 * @Author: cola
 * @Date: 2022-07-04 19:17:18
 * @LastEditors: cola
 * @Description:
-->
<template>
  <HelloWorld></HelloWorld>
  <SvgIcon name="user"></SvgIcon>
  <div>{{ counter }}</div>
  <button @click="increment">add</button>
  <div v-for="i in list" :key="i.name">
    {{ i.task }}
  </div>
</template>

<script setup lang="ts">
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
    proxy?.$message.success('这是一个提示')
    console.log(proxy?.$http)
  })
</script>
