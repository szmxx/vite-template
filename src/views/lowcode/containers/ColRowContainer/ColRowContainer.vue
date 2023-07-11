<!--
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="min-h-4rem border-dashed p-2">
    <GridRow
      v-for="i in __children__"
      :key="i.id as string"
      v-bind="config[i.id as string]"
      :class="{ 'relative border border-blue': current === i.id }"
      :__children__="i.children as IComponentPanelItemChild[]"
      @click.stop="clickHandler(i)"
    >
      <OperateTool
        v-show="current === i.id"
        :is-grid="true"
        @remove="remove(__children__, i)"
        @copy="copy(__children__, JSON.stringify(i))"
        @cancel="cancel"
        @up="up(__children__, i)"
        @down="down(__children__, i)"
        @column="addColumn(i)"
      ></OperateTool>
    </GridRow>
  </div>
</template>

<script setup lang="ts">
  import GridRow from './GridRow'
  import OperateTool from '../../layout/components/OperateTool.vue'
  import { IComponentPanelItemChild } from '../../types'
  import { PropType } from 'vue'
  import useStore from '@/store/lowcode'
  import { useConfig } from '../../composables'
  import {
    remove,
    copy,
    cancel,
    up,
    down,
    addColumn,
  } from '../../utils/operate'
  const store = useStore()

  defineProps({
    // eslint-disable-next-line vue/prop-name-casing
    __children__: {
      type: Array as PropType<IComponentPanelItemChild[]>,
      default: () => [],
    },
  })
  const config = useConfig()
  const current = computed(() => {
    return store.current
  })

  function clickHandler(data: IComponentPanelItemChild) {
    if (data.id) {
      store.setCurrent(data.id as string)
    }
  }
</script>
