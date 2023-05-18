<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
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

<script lang="ts">
  import mixin from '../../mixins/index'
  defineComponent({
    name: 'CommonInput',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
