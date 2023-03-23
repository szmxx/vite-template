<!--
 * @Author: cola
 * @Date: 2023-03-23 23:10:12
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-dialog v-model="dialogVisible" title="导出数据">
    <el-tabs v-model="activeName" class="bg-white h-full">
      <el-tab-pane
        v-for="tab in tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      >
        <CommonCodeEditor
          v-model="tab.code"
          class="min-h-20rem"
          language="json"
          :readonly="true"
        ></CommonCodeEditor>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
  import CommonCodeEditor from '../../components/CommonCodeEditor'
  import useStore from '@/store/lowcode'
  const store = useStore()
  const activeName = ref('data')
  const tabs = reactive([
    {
      label: '组件数据',
      name: 'data',
      code: '',
    },
    {
      label: '组件配置',
      name: 'config',
      code: '',
    },
    {
      label: '组件数据',
      name: 'model',
      code: '',
    },
  ])
  watch(store.componentTree, (newVal) => {
    tabs[0].code = JSON.stringify(newVal, null, 2)
  })
  watch(
    () => store.config,
    (newVal) => {
      tabs[1].code = JSON.stringify(newVal, null, 2)
    }
  )
  watch(store.model, (newVal) => {
    tabs[2].code = JSON.stringify(newVal, null, 2)
  })

  const dialogVisible = ref(false)

  function show() {
    dialogVisible.value = true
  }

  defineExpose({
    show: show,
  })
</script>
