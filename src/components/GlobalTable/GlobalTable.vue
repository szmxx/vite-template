<!--
 * @Author: cola
 * @Date: 2022-12-21 10:39:18
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div ref="root" class="table-container">
    <el-table :data="data" :max-height="maxTableHeight" v-bind="$attrs">
      <el-table-column
        v-for="col in columns"
        v-show="col.show !== false"
        :key="col.prop"
        v-bind="col"
      >
        <template #default="scope">
          <template v-if="'render' in col">
            <table-render
              v-bind="scope"
              :render="col.render"
              :column-data="col"
            ></table-render>
          </template>
          <template v-else-if="'isSlot' in col">
            <table-slot v-bind="scope" :column-data="col"></table-slot>
          </template>
          <template v-else>{{ scope.row[col.prop] }}</template>
        </template>
      </el-table-column>
      <template #empty>
        <slot name="empty"></slot>
      </template>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
  import { PropType } from 'vue'
  import tableRender from './tableRender'
  import tableSlot from './tableSlot'
  import { Column } from 'element-plus'
  defineOptions({
    name: 'GlobalTable',
    inheritAttrs: false,
  })
  const props = defineProps({
    data: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<Column[]>,
      default: () => [],
    },
    maxHeight: {
      type: Number,
      default: 0,
    },
  })
  const root = ref<HTMLElement>()
  const maxTableHeight = ref(0)
  provide('tableRoot', getCurrentInstance())

  useEventListener('resize', () => {
    let height = root?.value?.parentElement?.getBoundingClientRect?.()?.height
    const { paddingTop, paddingBottom } = getComputedStyle(
      root?.value?.parentElement as HTMLElement
    )
    height =
      parseFloat(String(height)) -
      parseFloat(paddingTop) -
      parseFloat(paddingBottom)
    if (props.maxHeight !== 0) {
      height = props.maxHeight
    }
    if (height && !isNaN(height)) {
      nextTick(() => {
        maxTableHeight.value = height || 0
      })
    }
  })
</script>
