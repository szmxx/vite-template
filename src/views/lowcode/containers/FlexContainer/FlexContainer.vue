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
      :style="{ width: chunkWidth }"
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { append, remove, cancel, up, down } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../composables'
  import { StyleValue, PropType } from 'vue'
  const store = useStore()
  const props = defineProps({
    __children__: {
      type: Array as PropType<IComponentPanelItemChild[]>,
      default: () => [],
    },
  })

  const list: IComponentPanelItemChild[] = reactive(props.__children__)
  const chunkWidth = ref('auto')
  defineOptions({
    name: 'FlexContainer',
    inheritAttrs: true,
  })
  const current = computed(() => {
    return store.current
  })

  const model = useModel()
  const config = useConfig()
  const attrs = useAttrs()
  const style = computed(() => {
    return Object.assign({ display: attrs['flex-type'] }, attrs) as StyleValue
  })
  watch(
    () => attrs['row-count'],
    (newVal) => {
      if ((newVal as number) > 0) {
        chunkWidth.value = `calc((100% - ${attrs['row-gap']}) / ${newVal})`
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
      append(list, data)
    }
  }
</script>
