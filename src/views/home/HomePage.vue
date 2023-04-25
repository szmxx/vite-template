<!--
 * @Author: cola
 * @Date: 2022-07-04 19:17:18
 * @LastEditors: cola
 * @Description:
-->
<template>
  <HeaderPage></HeaderPage>
  <div class="flex gap-16px p-4">
    <div @click="openHandler(i)" class="flex center border-rounded cursor-pointer w-400px h-200px bg-white hover:bg-blue" v-for="i in portals" :key="i.label">
      {{ i.label }}
    </div>
  </div>
</template>

<script setup lang="ts">
  import HeaderPage from './components/HeaderPage.vue'
  import { getTodoList, TodoItem } from '@/api/public'
  import useStore from '@/store/counter'
  import { storeToRefs } from 'pinia'
  import { ComponentInternalInstance } from 'vue'
  const store = useStore()
  const { counter } = storeToRefs(store)
  const increment = store.increment
  const list = ref<TodoItem[]>([])
  async function fetchData() {
    getTodoList()
  }
  const portals = [{
    label: '星图',
    path: '/star'
  }, {
    label: '大文件上传和下载',
    path: '/file'
  }]
  const { proxy } = getCurrentInstance() as ComponentInternalInstance
  onBeforeMount(async () => {
    await fetchData()
    console.log(proxy?.$http)
  })
  const router = useRouter()

  function openHandler(i: Record<string, string>){
    router.push(i.path)
  }
</script>
