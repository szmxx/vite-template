<!--
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
-->
<!--
 * @Author: cola
 * @Date: 2023-03-20 18:09:35
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-tabs v-model="activeName">
    <TabPanel
      v-for="i in options"
      :key="i.name"
      :label="i.label"
      :name="i.name"
      :__children__="i.children"
    >
    </TabPanel>
  </el-tabs>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import type { TabPaneName } from 'element-plus'
  import { TabItem } from './types'

  const props = defineProps({
    options: {
      type: Array as PropType<TabItem[]>,
      default: () => [],
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  })
  const activeName = ref<TabPaneName>(props?.options?.[0]?.name)
  watch(props.options, (newVal) => {
    if (newVal?.length && !activeName.value) {
      activeName.value = newVal[0].name
    }
  })
</script>
