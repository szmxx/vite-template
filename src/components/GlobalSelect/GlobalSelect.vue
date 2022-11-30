<!--
 * @Author: cola
 * @Date: 2022-11-01 12:00:34
 * @LastEditors: cola
 * @Description:
-->

<template>
  <div class="global-select">
    <el-select
      v-bind="$attrs"
      v-model="value"
      :placeholder="$attrs.placeholder || '请选择'"
      :placement="
        typeof $attrs.placement === 'string'
          ? $attrs.placement || 'bottom-start'
          : 'bottom-start'
      "
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  interface SelectItem {
    label: string
    value: unknown
  }
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<SelectItem[]>,
      default: () => [],
    },
  })
  defineOptions({
    name: 'GlobalSelect',
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
