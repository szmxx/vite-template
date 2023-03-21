<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    class="border-dashed min-h-4rem"
    droppable
    :style="style"
    @dragover="dragOver"
    @drop="dragEnd"
  >
    <div
      v-for="i in list"
      :key="i.id as string"
      :class="{ 'relative border border-blue': current === i.id }"
      @click.stop="clickHandler(i)"
    >
      <OperateTool
        v-show="current === i.id"
        class="absolute right-0 bottom-0"
        @remove="remove(list, i)"
        @copy="append(list, JSON.stringify(i))"
      ></OperateTool>
      <component
        :is="i.component"
        v-model="model[i.id as string]"
        v-bind="config[i.id as string]"
      ></component>
    </div>
  </div>
</template>

<script setup lang="ts">
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { append, remove } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../composables'
  import { StyleValue } from 'vue'
  const store = useStore()
  const list: IComponentPanelItemChild[] = reactive([])
  defineOptions({
    name: 'GridContainer',
    inheritAttrs: true,
  })
  const current = computed(() => {
    return store.current
  })

  const model = useModel()
  const config = useConfig()
  const attrs = useAttrs()
  const style = computed(() => {
    return Object.assign({ display: attrs['grid-type'] }, attrs) as StyleValue
  })

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
      append(list, data)
    }
  }
</script>
