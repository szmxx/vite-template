<!--
 * @Author: cola
 * @Date: 2023-03-20 10:26:23
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    droppable
    class="overflow-y-auto p-2"
    @dragover="dragOver"
    @drop="dragEnd"
  >
    <vuedraggable :list="list" item-key="id" handle=".handle">
      <template #item="{ element }">
        <div
          class="relative w-full"
          :class="{ 'border border-blue': current === element.id }"
          @click="selectHandler(element)"
        >
          <MoveTool
            v-show="current === element.id"
            class="absolute"
            :title="element.title"
          ></MoveTool>
          <OperateTool
            v-show="current === element.id"
            class="absolute right-1px bottom-1px"
            @remove="remove(list, element)"
            @copy="append(list, JSON.stringify(element))"
            @cancel="cancel"
            @up="up(list, element)"
            @down="down(list, element)"
          ></OperateTool>
          <!-- 定义渲染规则 -->
          <component
            :is="element.component"
            v-model="model[element.id]"
            v-bind="config[element.id]"
            :__children__="element.children"
          ></component>
        </div>
      </template>
    </vuedraggable>
  </div>
</template>

<script setup lang="ts">
  import vuedraggable from 'vuedraggable'
  import OperateTool from './components/OperateTool.vue'
  import MoveTool from './components/MoveTool.vue'
  import { useModel, useConfig } from '../composables'
  import { append, remove, cancel, up, down } from '../utils/operate'
  import { IComponentPanelItemChild } from '../types'
  import useStore from '@/store/lowcode'
  const store = useStore()
  const list: IComponentPanelItemChild[] = reactive([])

  watch(
    list,
    (newVal) => {
      store.pushHistoryStack(newVal)
    },
    { immediate: true }
  )

  const current = computed(() => {
    return store.current
  })
  const model = useModel()
  const config = useConfig()

  function dragOver(evt: DragEvent) {
    evt.preventDefault()
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'copy'
    }
  }

  function dragEnd(evt: DragEvent) {
    evt.preventDefault()
    const data = evt?.dataTransfer?.getData('text/plain')
    if (data) {
      append(list, data)
    }
  }

  function selectHandler(element: IComponentPanelItemChild) {
    if (element.id) {
      store.setCurrent(element.id as string)
    }
  }
</script>
