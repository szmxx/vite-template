<!--
 * @Author: cola
 * @Date: 2023-03-27 00:59:29
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-dialog v-model="dialogVisible" title="导出SFC">
    <CommonCodeEditor
      class="min-h-20rem"
      :code="code"
      language="vue"
    ></CommonCodeEditor>
  </el-dialog>
</template>

<script setup lang="ts">
  import { compileTemplate } from '../../sfc/index'
  const dialogVisible = ref(false)
  const code = ref('')

  function show() {
    const result = compileTemplate()
    code.value = result
    debugger
    dialogVisible.value = true
  }

  defineExpose({
    show: show,
  })
</script>
