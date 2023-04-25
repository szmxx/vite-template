<!--
 * @Author: cola
 * @Date: 2022-07-23 15:25:26
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="tree fx flex-col select-none cursor-pointer">
    <template v-for="i in props.data" :key="i.id">
      <TreeItem
        v-bind="i"
        :level="props.level"
        :group="i?.children?.length! > 0"
        @expand="expandHandler(i)"
        @toggle="toggleHandler(i, $event)"
      ></TreeItem>
      <TreeGroup
        v-if="i?.children?.length"
        v-show="i.expand"
        :data="i.children"
        :level="props.level + 1"
      ></TreeGroup>
    </template>
  </div>
</template>

<script setup lang="ts">
  import TreeItem from './TreeItem.vue'
  import { groupProps } from '../props'
  import type { TreeItem as ItemType } from '../types'
  const props = defineProps(groupProps)
  function expandHandler(i: ItemType) {
    i.expand = !i.expand
  }
  function toggleHandler(
    i: ItemType,
    event: {
      checked: boolean
      indeterminate: boolean
    }
  ) {
    i.checked = event.checked
    i.indeterminate = event.indeterminate
  }
</script>
