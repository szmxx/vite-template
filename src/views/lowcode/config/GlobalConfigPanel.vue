<!--
 * @Author: cola
 * @Date: 2023-03-20 21:11:03
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div>
    <FieldComponent
      ref="fieldRef"
      :styles="panelConfig"
      :config="config"
    ></FieldComponent>
    <div
      v-if="store.current"
      class="flex w-[20rem] items-center border-t-1 border-#eee justify-end fixed bottom-0 right-0 h-16 bg-white"
    >
      <el-button type="primary" class="mr-4" @click="saveHandler">
        保存配置
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FieldComponent from '../FieldComponent'
  import useStore from '@/store/lowcode'
  import { DEFAULT_GLOBAL_STYLE, DEFAULT_CONFIG_PANEL_STYLE } from './constants'
  const fieldRef = ref()
  const store = useStore()

  const panelConfig = computed(() => {
    if (store.panelConfig && Object.keys(store.panelConfig)?.length) {
      return store.panelConfig
    }
    return DEFAULT_CONFIG_PANEL_STYLE
  })
  const config = computed(() => {
    if (store.globalConfig && Object.keys(store.globalConfig)?.length) {
      return store.globalConfig
    }
    return DEFAULT_GLOBAL_STYLE
  })

  async function saveHandler() {
    const config = await fieldRef?.value?.submit?.()
    if (config) {
      store.setGlobalConfig(config.value || config)
    }
  }
</script>
