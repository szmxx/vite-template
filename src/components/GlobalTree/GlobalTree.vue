<!--
 * @Author: cola
 * @Date: 2022-07-23 17:30:39
 * @LastEditors: cola
 * @Description:
-->
<template>
  <TreeGroup :data="treeData" :level="props.level"></TreeGroup>
</template>

<script setup lang="ts">
  import { cloneDeep } from 'lodash-es'
  import TreeGroup from './components/TreeGroup.vue'
  import { treeProps } from './props'
  const props = defineProps(treeProps)
  const treeData = computed(() => reactive(cloneDeep(props.data)))
  const emit = defineEmits(['expand', 'click', 'change'])
  const active = ref({})
  provide('emit', emit)
  provide('active', active)
  provide('iconType', props.iconType)
  provide('showCheckBox', props.showCheckBox)
</script>
