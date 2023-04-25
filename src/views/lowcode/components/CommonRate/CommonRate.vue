<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-rate v-model="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0,
    },
  })
  defineOptions({
    name: 'CommonRate',
    inheritAttrs: true,
  })
  const emit = defineEmits(['update:modelValue'])
  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })
</script>
