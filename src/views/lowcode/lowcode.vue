<!--
 * @Author: cola
 * @Date: 2023-03-17 11:25:12
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="lowcode w-full h-full flex flex-nowrap">
    <ComponentPanel class="w-[20rem] h-full overflow-y-auto"></ComponentPanel>
    <div class="flex-1 flex flex-col">
      <RenderPanelToolbar
        class="h-3rem bg-white"
        @redo="redo"
        @undo="undo"
        @clear="clear"
        @preview="preview"
      ></RenderPanelToolbar>
      <RenderPanel ref="renderRef" class="flex-1"></RenderPanel>
    </div>
    <ConfigPanel
      v-show="current"
      class="w-[20rem] h-full overflow-hidden"
    ></ConfigPanel>
  </div>
  <Preview ref="previewRef"></Preview>
</template>

<script setup lang="ts">
  import ComponentPanel from './layout/ComponentPanel.vue'
  import RenderPanel from './layout/RenderPanel.vue'
  import ConfigPanel from './layout/ConfigPanel.vue'
  import RenderPanelToolbar from './layout/RenderPanelToolbar.vue'
  import Preview from './preview'
  import useStore from '@/store/lowcode'
  const store = useStore()
  const renderRef = ref()
  const previewRef = ref()

  const current = computed(() => {
    return store.current
  })

  function undo() {
    const res = store.undo()
    if (res) {
      renderRef?.value?.refresh?.(res)
    }
  }

  function redo() {
    const res = store.redo()
    if (res) {
      renderRef.value.refresh(res)
    }
  }

  function clear() {
    const res = store.clear()
    if (res) {
      renderRef.value.refresh(res)
    }
  }

  function preview() {
    previewRef?.value?.show?.()
  }
</script>
