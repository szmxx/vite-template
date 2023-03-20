<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-tabs v-model="activeName" class="bg-white">
    <el-tab-pane
      v-for="tab in tabs"
      :key="tab.name"
      :label="tab.label"
      :name="tab.name"
    >
      <component :is="tab.component"></component>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
  import BasicConfigPanel from '../config/BasicConfigPanel.vue'
  import GlobalConfigPanel from '../config/GlobalConfigPanel.vue'
  const tabs = [
    {
      label: '基础配置',
      name: 'basic',
      component: BasicConfigPanel,
    },
    {
      label: '全局配置',
      name: 'global',
      component: GlobalConfigPanel,
    },
  ]
  const activeName = ref('basic')
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
