<!--
 * @Author: cola
 * @Date: 2023-03-20 16:03:40
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-transfer v-model="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
  import {TransferKey} from 'element-plus';
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
  })
  defineOptions({
    name: 'CommonTransfer',
    inheritAttrs: true,
  })
  const emit = defineEmits(['update:modelValue'])
  const value = computed({
    get() {
      return props.modelValue as TransferKey[]
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
</script>
