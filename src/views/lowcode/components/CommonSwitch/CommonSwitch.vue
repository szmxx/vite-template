<!--
 * @Author: cola
 * @Date: 2023-03-20 16:05:50
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-switch v-model="value" />
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  })
  defineOptions({
    name: 'CommonSwitch',
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

<style scoped lang="scss"></style>
