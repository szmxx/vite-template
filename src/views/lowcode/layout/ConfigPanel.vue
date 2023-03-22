<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="relative h-full">
    <el-tabs v-model="activeName" class="bg-white h-full">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <template #label>
          <span class="flex gap-x-2 items-center">
            <i :class="tab.icon"></i>
            <span>{{ tab.label }}</span>
          </span>
        </template>
        <component :is="tab.component"></component>
      </el-tab-pane>
      <ConfigPanelDialog ref="refConfig"></ConfigPanelDialog>
    </el-tabs>
    <CommonText
      class="absolute right-2 top-2.5 cursor-pointer"
      label="配置面板"
      type="primary"
      @click="openDialog"
    ></CommonText>
  </div>
</template>

<script setup lang="ts">
  import BasicConfigPanel from '../config/BasicConfigPanel.vue'
  import GlobalConfigPanel from '../config/GlobalConfigPanel.vue'
  import ConfigPanelDialog from './components/ConfigPanelDialog.vue'
  const tabs = [
    {
      label: '基础配置',
      name: 'basic',
      component: BasicConfigPanel,
      icon: 'i-carbon-settings-view',
    },
    {
      label: '全局配置',
      name: 'global',
      component: GlobalConfigPanel,
      icon: 'i-carbon-earth',
    },
  ]
  const refConfig = ref()
  const activeName = ref('basic')

  function openDialog() {
    refConfig?.value?.show?.()
  }
</script>

<style lang="scss" scoped>
  :deep(.el-tabs__header) {
    padding-left: 8px;
  }

  :deep(.el-tabs__content) {
    overflow-y: auto;
    padding: 0 8px;
    height: calc(100% - 55px);
  }
</style>
