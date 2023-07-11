<!--
 * @Author: cola
 * @Date: 2023-03-20 10:26:23
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-dialog v-model="dialogVisible" title="预览页面">
    <div class="overflow-y-auto p-2 max-h-25rem">
      <div v-for="item in list" :key="item.id as string" class="w-full">
        <component
          :is="item.component"
          v-model="model[item.id as string]"
          v-bind="config[item.id as string]"
          :__children__="item.children"
          :is-preview="true"
        ></component>
      </div>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
  import { useModel, useConfig } from '../composables'
  import { IComponentPanelItemChild } from '../types'
  import useStore from '@/store/lowcode'
  const store = useStore()
  const list = ref<IComponentPanelItemChild[]>(store.componentTree)
  const dialogVisible = ref(false)
  const model = useModel()
  const config = useConfig()
  defineExpose({
    show: show,
  })
  function show() {
    list.value = store.componentTree
    dialogVisible.value = true
  }

  function hide() {
    dialogVisible.value = false
  }

  defineExpose({
    hide: hide,
  })
</script>
