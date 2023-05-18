<!--
 * @Author: cola
 * @Date: 2022-12-21 10:39:18
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div ref="root">
    <el-table
      :style="{ maxWidth: maxTableWidth ? maxTableWidth + 'px' : 'auto' }"
      :data="data"
      :max-height="maxTableHeight"
      v-bind="$attrs"
    >
      <el-table-column
        v-for="col in columns"
        v-show="col.show !== false"
        :key="col.prop"
        v-bind="col"
      >
        <template #default="scope">
          <template v-if="'render' in col">
            <table-render
              :scope="scope"
              :render="col.render"
              :column-data="col"
            ></table-render>
          </template>
          <template v-else-if="'isSlot' in col">
            <table-slot :scope="scope" :column-data="col"></table-slot>
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
  import { InstanceKey } from './constants'

  const props = defineProps({
    data: {
      type: Array as PropType<Record<string, unknown>[]>,
      default: () => [],
    },
    columns: {
      type: Array as PropType<Record<string, any>[]>,
      default: () => [],
    },
    maxHeight: {
      type: Number,
      default: 400,
    },
    offsetHeight: {
      type: Number,
      default: 0,
    },
  })
  const root = ref<HTMLElement>()
  const maxTableHeight = ref(0)
  const maxTableWidth = ref(0)
  provide(InstanceKey, getCurrentInstance())
  onMounted(() => {
    resize()
  })
  useEventListener('resize', resize)

  function resize() {
    // eslint-disable-next-line prefer-const
    let { height, width } =
      root?.value?.parentElement?.getBoundingClientRect?.() || {}
    const { paddingTop, paddingBottom } = getComputedStyle(
      root?.value?.parentElement as HTMLElement
    )
    height =
      parseFloat(String(height)) -
      parseFloat(paddingTop) -
      parseFloat(paddingBottom)
    if (props.maxHeight !== 0) {
      // 使用分页可能导致计算方式不对
      height = props.maxHeight - props.offsetHeight
    }
    if (height && !isNaN(height)) {
      nextTick(() => {
        maxTableWidth.value = width || 0
        maxTableHeight.value = height || 0
      })
    }
  }
</script>

<script lang="ts">
  import mixin from '../../mixins/index'
  defineComponent({
    name: 'CommonTable',
    mixins: [mixin],
    inheritAttrs: false,
  })
</script>
