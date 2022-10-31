<!--
 * @Author: cola
 * @Date: 2022-07-23 15:29:04
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    class="tree-item i-fy lh-large hover:bg-primary-light-7 relative"
    :class="[
      'm-' + props?.level,
      { 'text-primary': active.id === props.id },
      { group: props.group },
    ]"
    @click.stop.prevent="clickHandler"
  >
    <div v-if="props.group && iconType === 'left'">
      <div
        class="i-mdi-menu-right transition-transform"
        :class="{ 'rotate-90': props.expand }"
      ></div>
    </div>
    <input
      v-if="showCheckBox"
      v-model="checked"
      :indeterminate="indeterminate"
      type="checkbox"
      @click.stop="toggleHandler"
    />
    <div
      v-if="props?.meta?.icon"
      :class="props?.meta?.icon"
      class="mr-extra-small"
    ></div>
    <div class="text-ellipsis">{{ props.title }}</div>
    <div
      v-if="props.group && iconType === 'right'"
      class="absolute right-0 pr-base"
    >
      <div
        class="i-mdi-chevron-up"
        :class="{ 'rotate-180 transition-transform': props.expand }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Ref } from 'vue'
  import { itemProps } from '../props'
  import type { TreeItem } from '../types'
  const props = defineProps({
    ...itemProps,
    ...{
      level: {
        type: Number,
        default: 0,
      },
    },
  })
  const emit = defineEmits(['expand', 'toggle'])
  const rootEmit = inject<(...arg: unknown[]) => void>('emit')!
  const iconType = inject<string>('iconType')
  const showCheckBox = inject<boolean>('showCheckBox')
  const checked = computed({
    get() {
      return props.checked
    },
    set(newVal) {
      emit('toggle', {
        checked: newVal,
        indeterminate: indeterminate.value,
      })
    },
  })
  watch(
    () => props.children,
    () => {
      checked.value = getAllChildren(props.children)
    },
    { deep: true }
  )
  const active = inject<Ref>('active')!
  function clickHandler() {
    if (!props.group) {
      active.value = props
    }
    emit('expand')
    nextTick(() => {
      if (props.group) {
        rootEmit('expand', props)
      } else {
        rootEmit('click', props)
      }
    })
  }

  const indeterminate = ref(false)

  function toggleHandler() {
    if (props?.children?.length) {
      setAllChildren(props.children, props.checked)
    }
    nextTick(() => {
      rootEmit('change', props)
    })
  }
  function setAllChildren(children: TreeItem[], checked: boolean) {
    if (children?.length) {
      children.map((i) => {
        i.checked = !checked
        i.indeterminate = false
        if (i?.children?.length) {
          setAllChildren(i.children, checked)
        }
      })
    }
  }
  function getAllChildren(children: TreeItem[]): boolean {
    let bool = false
    let i = 0,
      j = 0
    children.map((item) => {
      if (item.checked || item.indeterminate) {
        i++
      }
      if (item.indeterminate) {
        j++
      }
    })
    indeterminate.value = true
    if (i === 0) {
      indeterminate.value = false
    }
    if (i === children.length) {
      if (j === 0) {
        indeterminate.value = false
      }
      bool = true
    }
    return bool
  }
</script>

<style scoped lang="scss">
  @use 'sass:math';

  @each $key in (0, 1, 2, 3, 4, 5, 6, 7, 8, 9) {
    .tree-item.m-#{$key} {
      padding-left: calc(var(--v-space-medium) * ($key));
    }
  }
</style>
