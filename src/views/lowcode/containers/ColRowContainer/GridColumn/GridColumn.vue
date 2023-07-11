<!--
 * @Author: cola
 * @Date: 2023-05-04 16:54:31
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-col
    class="min-h-4rem border-dashed"
    droppable
    @dragover.prevent.stop="dragOver"
    @drop.prevent.stop="dragEnd"
  >
    <div
      v-for="i in __children__"
      :key="i.id as string"
      :class="{ 'relative border border-blue': current === i.id }"
    >
      <OperateTool
        v-show="current === i.id"
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
        :__children__="i.children"
      ></component>
    </div>
    <slot></slot>
  </el-col>
</template>

<script setup lang="ts">
  import { remove, copy, cancel, up, down } from '../../../utils/operate'
  import { IComponentPanelItemChild } from '../../../types'
  import { append } from '../../../utils/operate'
  import { PropType } from 'vue'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../../composables'
  const store = useStore()
  const props = defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    __children__: {
      type: Array as PropType<IComponentPanelItemChild[]>,
      default: () => [],
    },
  })

  const current = computed(() => {
    return store.current
  })
  const model = useModel()
  const config = useConfig()
  function dragOver(evt: DragEvent) {
    if (evt.dataTransfer) {
      evt.dataTransfer.dropEffect = 'copy'
    }
  }

  function dragEnd(evt: DragEvent) {
    const data = evt?.dataTransfer?.getData('text/plain')
    if (data) {
      append(props.__children__, data)
    }
  }
</script>
