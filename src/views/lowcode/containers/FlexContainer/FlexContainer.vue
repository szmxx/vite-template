<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    class="min-h-4rem"
    :class="{ 'border-dashed': !isPreview }"
    droppable
    :style="style"
    @dragover="dragOver"
    @drop="dragEnd"
  >
    <div
      v-for="i in __children__"
      :key="i.id as string"
      :style="{ width: chunkWidth }"
      :class="{ 'relative border border-blue': current === i.id && !isPreview }"
      @click.stop="clickHandler(i)"
    >
      <OperateTool
        v-show="current === i.id"
        v-if="!isPreview"
        @remove="remove(__children__, i)"
        @copy="copy(__children__, JSON.stringify(i))"
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { append, remove, copy, cancel, up, down } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../composables'
  import { StyleValue, PropType } from 'vue'
  const store = useStore()
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
      append(props.__children__, data)
    }
  }
</script>
