<!--
 * @Author: cola
 * @Date: 2023-03-22 15:47:41
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-dialog v-model="dialogVisible" title="配置面板样式">
    <FieldComponent ref="fieldRef" :config="config"></FieldComponent>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="hide">取消</el-button>
        <el-button type="primary" @click="saveHandler"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import FieldComponent from '../../FieldComponent'
  import useStore from '@/store/lowcode'
  import { DEFAULT_CONFIG_PANEL_STYLE } from '../../config/constants'
  const dialogVisible = ref(false)
  const fieldRef = ref()
  const store = useStore()

  const config = computed(() => {
    if (store.panelConfig && Object.keys(store.panelConfig)?.length) {
      return store.panelConfig
    }
    return DEFAULT_CONFIG_PANEL_STYLE
  })

  defineExpose({
    show: show,
    hide: hide,
  })

  function hide() {
    dialogVisible.value = false
  }
  function show() {
    dialogVisible.value = true
  }
  async function saveHandler() {
    const config = await fieldRef?.value?.submit?.()
    if (config) {
      store.setPanelConfig(config.value || config)
    }
    hide()
  }
</script>
