<!--
 * @Author: cola
 * @Date: 2023-03-20 18:07:30
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-form
    class="min-h-4rem"
    :class="{ 'border-dashed': !isPreview }"
    droppable
    :model="formModel"
    @dragover="dragOver"
    @drop="dragEnd"
  >
    <el-form-item
      v-for="i in __children__"
      :key="i.id as string"
      v-bind="formItemConfig[i.id as string]"
      :class="{ 'relative border border-blue': current === i.id && !isPreview }"
      @click.stop="clickHandler(i)"
    >
      <OperateTool
        v-show="current === i.id"
        v-if="!isPreview"
        class="absolute right-0 bottom-0"
        @remove="remove(__children__, i)"
        @copy="copy(__children__, JSON.stringify(i), {})"
        @cancel="cancel"
        @up="up(__children__, i)"
        @down="down(__children__, i)"
      ></OperateTool>
      <component
        :is="i.component"
        v-model="model[i.id as string]"
        v-bind="config[i.id as string]"
        :is-preview="isPreview"
        :__children__="i.children"
      ></component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { append, remove, copy, cancel, up, down } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../composables'
  import { DEFAULT_FORMITEM_CONFIG } from './constants'
  import { PropType } from 'vue'
  const store = useStore()
  const formModel = reactive({})

  const props = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    __children__: {
      type: Array as PropType<IComponentPanelItemChild[]>,
      default: () => [],
    },
    isPreview: {
      type: Boolean,
      default: false,
    },
  })

  const current = computed(() => {
    return store.current
  })

  const model = useModel()
  const config = useConfig()
  const formItemConfig = computed(() => store.formItemConfig)

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
      append(props.__children__, data, DEFAULT_FORMITEM_CONFIG)
    }
  }
</script>
