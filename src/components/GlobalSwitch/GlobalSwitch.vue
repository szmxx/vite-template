<!--
 * @Author: cola
 * @Date: 2022-11-01 14:44:48
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="global-switch">
    <el-switch v-bind="$attrs" v-model="value"></el-switch>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  })
  defineOptions({
    name: 'GlobalSwitch',
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
