<template>
  <el-input
    v-bind="$attrs"
    v-model="value"
    :placeholder="$attrs.placeholder as string || '请输入内容'"
  />
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
  })
  defineOptions({
    name: 'CommonInput',
    inheritAttrs: true,
  })
  const emit = defineEmits(['update:modelValue'])
  const value = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      console.log(value)
      emit('update:modelValue', value)
    },
  })
</script>
