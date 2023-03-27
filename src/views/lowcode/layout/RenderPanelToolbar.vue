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
        <i
          i-mdi-arrow-u-left-top
          class="cursor-pointer"
          data-type="undo"
          :class="{ 'text-#eee': undoDisabled }"
        ></i>
        <i
          i-mdi-arrow-u-right-top
          class="cursor-pointer"
          data-type="redo"
          :class="{ 'text-#eee': redoDisabled }"
        ></i>
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
    <ExportConfigDialog ref="exportRef"></ExportConfigDialog>
    <ExportSFCDialog ref="sfcRef"></ExportSFCDialog>
  </div>
</template>

<script setup lang="ts">
  import useStore from '@/store/lowcode'
  import ExportConfigDialog from './components/ExportConfigDialog.vue'
  import ExportSFCDialog from './components/ExportSFCDialog.vue'
  const store = useStore()
  const exportRef = ref()
  const sfcRef = ref()
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

  const undoDisabled = computed(() => {
    return store.undoDisabled
  })

  const redoDisabled = computed(() => {
    return store.redoDisabled
  })

  const emit = defineEmits(['redo', 'undo', 'clear', 'preview'])
  function opHandler(evt: MouseEvent) {
    const target = evt.target as HTMLElement
    const type = target?.dataset?.type
    switch (type) {
      case 'clear':
        emit('clear')
        break
      case 'preview':
        emit('preview')
        break
      case 'import':
        break
      case 'export':
        exportRef?.value?.show?.()
        break
      case 'sfc':
        sfcRef?.value?.show?.()
        break
      // 涉及组件的删除、新增、移动
      case 'undo':
        emit('undo')
        break
      case 'redo':
        emit('redo')
        break
    }
  }
</script>
