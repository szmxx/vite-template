<!--
 * @Author: cola
 * @Date: 2023-04-28 11:44:50
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-tab-pane
    droppable
    class="min-h-4rem"
    :label="label"
    :name="name"
    @dragover="dragOver"
    @drop="dragEnd"
  >
    <div
      v-for="i in __children__"
      :key="i.id as string"
      :class="{
        'relative border border-blue': current === i.id,
      }"
      @click.stop="clickHandler(i)"
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
      >
      </component>
    </div>
  </el-tab-pane>
</template>

<script setup lang="ts">
  import { IComponentPanelItemChild } from '../../types'
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { append, remove, cancel, copy, up, down } from '../../utils/operate'
  import { useModel, useConfig } from '../../composables'
  import useStore from '@/store/lowcode'
  import { PropType } from 'vue'
  const current = computed(() => {
    return store.current
  })
  const store = useStore()

  const model = useModel()
  const config = useConfig()
  const props = defineProps({
    name: {
      type: String,
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    // eslint-disable-next-line vue/prop-name-casing
    __children__: {
      type: Object as PropType<IComponentPanelItemChild[]>,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: () => [],
    },
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
      append(props.__children__, data)
    }
  }
</script>
