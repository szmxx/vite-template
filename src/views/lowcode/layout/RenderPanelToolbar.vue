<!--
 * @Author: cola
 * @Date: 2023-03-22 16:19:26
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    class="flex justify-between items-center px-2 border border-#eee text-#888"
  >
    <div>
      <div class="flex gap-x-2" @click="opHandler">
        <i i-mdi-arrow-u-left-top class="cursor-pointer" data-type="undo"></i>
        <i i-mdi-arrow-u-right-top class="cursor-pointer" data-type="redo"></i>
      </div>
    </div>
    <div class="flex gap-x-2 items-center flex-nowrap" @click="opHandler">
      <span
        v-for="i in opList"
        :key="i.value"
        :data-type="i.value"
        class="flex cursor-pointer gap-x-2 bg-#eee p-1.2 border-rounded-1 text-3"
      >
        <i :class="i.icon" :data-type="i.value"></i>
        <span :data-type="i.value">{{ i.label }}</span>
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import useStore from '@/store/lowcode'
  const store = useStore()

  const opList = [
    {
      label: '清空',
      value: 'clear',
      icon: 'i-mdi-broom',
    },
    {
      label: '预览',
      value: 'preview',
      icon: 'i-mdi-eye-arrow-right',
    },
    {
      label: '导入JSON',
      value: 'import',
      icon: 'i-carbon-document-import',
    },
    {
      label: '导出JSON',
      value: 'export',
      icon: 'i-carbon-export',
    },
    {
      label: '生成SFC',
      value: 'sfc',
      icon: 'i-mdi-microsoft-visual-studio-code',
    },
  ]

  function opHandler(evt: MouseEvent) {
    const target = evt.target as HTMLElement
    const type = target?.dataset?.type
    switch (type) {
      case 'clear':
        break
      case 'preview':
        console.log(store.config)
        break
      case 'import':
        break
      case 'export':
        break
      case 'sfc':
        break
      // 涉及组件的删除、新增、移动
      case 'undo':
        break
      case 'redo':
        break
    }
  }
</script>

<style scoped lang="scss"></style>
