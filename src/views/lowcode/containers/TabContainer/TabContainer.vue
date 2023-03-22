<!--
 * @Author: cola
 * @Date: 2023-03-20 18:09:35
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-tabs v-model="activeName">
    <el-tab-pane
      v-for="i in options"
      :key="i.name"
      droppable
      :label="i.label"
      :name="i.name"
      class="min-h-4rem"
      @dragover="dragOver"
      @drop="dragEnd"
    >
      <div
        v-for="item in componentMap[activeName]"
        :key="item.id as string"
        :class="{
          'relative border border-blue': current === item.id,
        }"
        @click.stop="clickHandler(item)"
      >
        <OperateTool
          v-show="current === item.id"
          class="absolute right-0 bottom-0"
          @remove="remove(componentMap[activeName], item)"
          @copy="append(componentMap[activeName], JSON.stringify(item))"
          @cancel="cancel"
          @up="up(componentMap[activeName], item)"
          @down="down(componentMap[activeName], item)"
        ></OperateTool>
        <component
          :is="item.component"
          v-model="model[item.id as string]"
          v-bind="config[item.id as string]"
        ></component>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import type { TabPaneName } from 'element-plus'
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { append, remove, cancel, up, down } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../composables'
  interface TabItem {
    label: string
    name: string
    disabled?: boolean
    closable?: boolean
    lazy?: boolean
  }
  const activeName = ref<TabPaneName>('')
  const componentMap: Record<string, IComponentPanelItemChild[]> = reactive({})
  const model = useModel()
  const config = useConfig()
  const store = useStore()

  const current = computed(() => {
    return store.current
  })
  const props = defineProps({
    options: {
      type: Array as PropType<TabItem[]>,
      default: () => [],
    },
  })

  watch(
    () => props.options,
    (newVal) => {
      if (newVal?.length && !activeName.value) {
        activeName.value = newVal[0].name
      }
    },
    {
      immediate: true,
    }
  )

  watch(
    activeName,
    () => {
      if (activeName.value && !componentMap[activeName.value]?.length) {
        componentMap[activeName.value] = []
      }
    },
    {
      immediate: true,
    }
  )

  function dragOver(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'copy'
    }
  }

  function clickHandler(data: IComponentPanelItemChild) {
    if (data.id) {
      store.setCurrent(data.id as string)
    }
  }

  function dragEnd(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    const data = evt?.dataTransfer?.getData('text/plain')
    if (data) {
      append(componentMap[activeName.value], data)
    }
  }
</script>
