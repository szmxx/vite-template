<!--
 * @Author: cola
 * @Date: 2022-11-01 14:42:19
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="global-input">
    <el-input
      v-bind="$attrs"
      v-model="value"
      :placeholder="$attrs.placeholder as string || '请输入内容'"
    />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })
  defineOptions({
    name: 'GlobalInput',
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
