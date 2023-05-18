<!--
 * @Author: cola
 * @Date: 2023-03-27 00:59:29
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-dialog v-model="dialogVisible" title="导出SFC">
    <el-tabs v-model="activeName" class="bg-white h-full">
      <el-tab-pane
        v-for="tab in tabs"
        :key="(tab.filename as string)"
        :label="(tab.filename as string)"
        :name="(tab.filename as string)"
      >
        <CommonCodeEditor
          v-model="tab.code"
          class="min-h-20rem"
          language="html"
          :auto-format="true"
        ></CommonCodeEditor>
        <CommonButton
          class="mt-4 float-right"
          label="导出数据"
          type="primary"
          @click="exportHandler(tab.code as string)"
        ></CommonButton>
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script setup lang="ts">
  import JSZip from 'jszip'
  import sfc from '../../sfc/index'
  import { download } from '../../utils/util'
  const dialogVisible = ref(false)
  const codeRef = ref()
  const activeName = ref('')
  const tabs = ref<Record<string, string>[]>([])
  async function show() {
    const result = await sfc()
    tabs.value = result
    activeName.value = result?.[0]?.filename as string
    dialogVisible.value = true
    setTimeout(() => {
      codeRef?.value?.format?.()
    }, 200)
  }

  function exportHandler() {
    const zip = new JSZip()
    const component = zip.folder('components')
    tabs.value.map((tag) => {
      if (tag.filename === 'RootPage.vue') {
        zip.file(tag.filename, tag.code)
      } else {
        component?.file?.(tag.filename, tag.code)
      }
    })
    zip.generateAsync({ type: 'blob' }).then(function (content) {
      // see FileSaver.js
      const blobUrl = URL.createObjectURL(content)
      download(blobUrl, 'lowcode.zip')
    })
  }
  defineExpose({
    show: show,
  })
</script>
