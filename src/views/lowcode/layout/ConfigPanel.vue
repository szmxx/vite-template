<template>
  <el-tabs class="bg-white" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane v-for="tab in tabs" :label="tab.label" :name="tab.name" :key="tab.name">
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
const tabs = [{
  label: "基础配置",
  name: 'basic'
}]
const activeName = ''
function handleClick() {

}
</script>
