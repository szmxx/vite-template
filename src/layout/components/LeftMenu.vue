<!--
 * @Author: cola
 * @Date: 2022-07-24 12:31:32
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="left-menu h-full flex flex-col">
    <MenuHeader></MenuHeader>
    <div v-loading="loading" class="flex-1 overflow-y-auto">
      <GlobalTree
        v-if="data?.length"
        :data="data"
        icon-type="right"
        :show-check-box="true"
        :level="1"
      ></GlobalTree>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { getMenuList } from '@/api/public'
  import MenuHeader from './MenuHeader.vue'
  import { useRequest } from 'vue-request'
  import { TreeItem } from '@/components/GlobalTree/types'
  function delay(timeout = 3000): Promise<TreeItem[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(getMenuList() || [])
      }, timeout)
    })
  }
  const { data, loading } = useRequest(delay, {})
  watch(loading, () => {
    console.log(loading.value)
  })

  setTimeout(() => {
    data.value = data.value?.slice(1, 2)
    console.log(data.value)
  }, 4000)
</script>

<style lang="scss" scoped>
  :deep(.tree-item.i-fy) {
    line-height: 50px;
  }
</style>
