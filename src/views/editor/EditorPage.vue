<!--
 * @Author: cola
 * @Date: 2022-10-31 10:55:51
 * @LastEditors: cola
 * @Description:
-->

<template>
  <div class="editor">
    <EditorTree @node-click="nodeClick"></EditorTree>
    <VisualPanel
      v-if="isShowPanel"
      v-model="isShowPanel"
      :data="visualData"
    ></VisualPanel>
  </div>
</template>

<script setup lang="ts">
  import { TreeItem } from './types'
  import EditorTree from './components/EditorTree.vue'
  import VisualPanel from './components/VisualPanel.vue'
  const isShowPanel = ref(false)
  const visualData = ref<Record<string, unknown>>()
  function nodeClick(data: TreeItem) {
    isShowPanel.value = true
    visualData.value = data.meta || {}
  }
</script>

<style scoped lang="scss">
  .editor {
    display: block;
  }
</style>
