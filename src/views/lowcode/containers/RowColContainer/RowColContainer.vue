<!--
 * @Author: cola
 * @Date: 2023-04-11 01:18:39
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div>
    <el-row>
      <el-col
        v-for="i in __children__"
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
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { append, remove, copy, cancel, up, down } from '../../utils/operate'
  import useStore from '@/store/lowcode'
  import { useModel, useConfig } from '../../composables'
  import { PropType } from 'vue'
  const store = useStore()
  const current = computed(() => {
    return store.current
  })

  const model = useModel()
  const config = useConfig()
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
