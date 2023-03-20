<!--
 * @Author: cola
 * @Date: 2023-03-20 10:26:23
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div droppable @dragover="dragOver" @drop="dragEnd">
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
            class="absolute right-0 bottom-0"
            @remove="remove(list, element)"
            @copy="append(list, JSON.stringify(element))"
          ></OperateTool>
          <component
            :is="element.component"
            v-model="model[element.id]"
            v-bind="config[element.id]"
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
  import { append, remove } from '../utils/operate'
  import { IComponentPanelItemChild } from '../types'
  import useStore from '@/store/lowcode'
  const store = useStore()
  const list: IComponentPanelItemChild[] = reactive([])
  const current = computed(() => {
    return store.current
  })

  const model = computed(() => {
    return store.model
  })

  const config = computed(() => {
    return store.config
  })

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
      store.setCurrent(element.id)
    }
  }
</script>
