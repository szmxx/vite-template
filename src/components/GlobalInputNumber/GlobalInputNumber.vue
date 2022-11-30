<!--
 * @Author: cola
 * @Date: 2022-11-01 16:26:28
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="global-input-number">
    <el-input-number
      v-bind="$attrs"
      v-model="value"
      :placeholder="$attrs.placeholder || ''"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Number,
      default: Infinity,
    },
  })
  defineOptions({
    name: 'GlobalInputNumber',
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
