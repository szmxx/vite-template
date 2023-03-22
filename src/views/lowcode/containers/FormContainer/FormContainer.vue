<!--
 * @Author: cola
 * @Date: 2023-03-20 18:07:30
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-form
    class="border-dashed min-h-4rem"
    droppable
    :model="formModel"
    @dragover="dragOver"
    @drop="dragEnd"
  >
    <el-form-item
      v-for="i in list"
      :key="i.id as string"
      v-bind="formItemConfig[i.id as string]"
      :class="{ 'relative border border-blue': current === i.id }"
      @click.stop="clickHandler(i)"
    >
      <OperateTool
        v-show="current === i.id"
        class="absolute right-0 bottom-0"
        @remove="remove(list, i)"
        @copy="append(list, JSON.stringify(i))"
        @cancel="cancel"
        @up="up(list, i)"
        @down="down(list, i)"
      ></OperateTool>
      <component
        :is="i.component"
        v-model="model[i.id as string]"
        v-bind="config[i.id as string]"
      ></component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { append, remove, cancel, up, down } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../composables'
  import { DEFAULT_FORMITEM_CONFIG } from './constants'
  import { PropType } from 'vue'
  const store = useStore()
  const formModel = reactive({})

  const props = defineProps({
    __children__: {
      type: Array as PropType<IComponentPanelItemChild[]>,
      default: () => [],
    },
  })

  const list: IComponentPanelItemChild[] = reactive(props.__children__)

  const current = computed(() => {
    return store.current
  })

  const model = useModel()
  const config = useConfig()
  const formItemConfig = computed(() => store.formItemConfig)

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
      append(list, data, DEFAULT_FORMITEM_CONFIG)
    }
  }
</script>
