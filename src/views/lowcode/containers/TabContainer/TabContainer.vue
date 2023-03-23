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
        v-for="i in __children__[activeName]"
        :key="i.id as string"
        :class="{
          'relative border border-blue': current === i.id && !isPreview,
        }"
        @click.stop="clickHandler(i)"
      >
        <OperateTool
          v-show="current === i.id"
          v-if="!isPreview"
          class="absolute right-0 bottom-0"
          @remove="remove(__children__[activeName], i)"
          @copy="copy(__children__[activeName], JSON.stringify(i))"
          @cancel="cancel"
          @up="up(__children__[activeName], i)"
          @down="down(__children__[activeName], i)"
        ></OperateTool>
        <component
          :is="i.component"
          v-model="model[i.id as string]"
          v-bind="config[i.id as string]"
          :is-preview="isPreview"
          :__children__="i.children"
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
  import { append, remove, cancel, copy, up, down } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../composables'
  interface TabItem {
    label: string
    name: string
    disabled?: boolean
    closable?: boolean
    lazy?: boolean
  }

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
    // eslint-disable-next-line vue/prop-name-casing
    __children__: {
      type: Object as PropType<Record<string, IComponentPanelItemChild[]>>,
      default: () => [],
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  })
  const activeName = ref<TabPaneName>(props?.options?.[0]?.name)
  watch(
    () => props.options,
    (newVal) => {
      if (newVal?.length && !activeName.value) {
        activeName.value = newVal[0].name
      }
    }
  )

  watch(
    activeName,
    () => {
      if (activeName.value && !props.__children__[activeName.value]?.length) {
        // eslint-disable-next-line vue/no-mutating-props
        props.__children__[activeName.value] = []
      }
    },
    {
      immediate: true,
    }
  )

  function dragOver(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    if (evt.dataTransfer && !props.isPreview) {
      evt.dataTransfer.dropEffect = 'copy'
    }
  }

  function clickHandler(data: IComponentPanelItemChild) {
    if (data.id && !props.isPreview) {
      store.setCurrent(data.id as string)
    }
  }

  function dragEnd(evt: DragEvent) {
    evt.preventDefault()
    evt.stopPropagation()
    const data = evt?.dataTransfer?.getData('text/plain')
    if (data && !props.isPreview) {
      append(props.__children__[activeName.value], data)
    }
  }
</script>
