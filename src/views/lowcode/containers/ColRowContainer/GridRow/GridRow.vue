<!--
 * @Author: cola
 * @Date: 2023-05-04 16:55:15
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-row
    class="min-h-4rem border-dashed p-2">
    <GridColumn
      v-for="i in __children__"
      :key="i.id as string"
      v-bind="config[i.id as string]"
      :__children__="i.children as IComponentPanelItemChild[]"
      :class="{ 'relative border border-blue': current === i.id }"
      @click.stop="clickHandler(i)">
        <OperateTool
          v-show="current === i.id"
          :isRow="true"
          @remove="remove(__children__, i)"
          @copy="copy(__children__, JSON.stringify(i))"
          @cancel="cancel"
          @up="up(__children__, i)"
          @down="down(__children__, i)"
        ></OperateTool>
    </GridColumn>
    <slot></slot>
  </el-row>
</template>

<script setup lang="ts">
  import { remove, copy, cancel, up, down } from '../../../utils/operate'
  import OperateTool from '../../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../../types'
  import GridColumn from "../GridColumn"
  import useStore from '@/store/lowcode'
  import { PropType } from 'vue'
  import { useConfig } from '../../../composables'
  const store = useStore()
  defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    __children__: {
      type: Array as PropType<IComponentPanelItemChild[]>,
      default: () => [],
    },
  })
  const current = computed(() => {
    return store.current
  })
  const config = useConfig()

  function clickHandler(data: IComponentPanelItemChild) {
    if (data.id) {
      store.setCurrent(data.id as string)
    }
  }
</script>

