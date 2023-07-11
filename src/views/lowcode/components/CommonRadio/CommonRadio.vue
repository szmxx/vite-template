<!--
 * @Author: cola
 * @Date: 2023-03-20 15:47:05
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-radio-group v-model="value" v-bind="$attrs">
    <template v-if="isButton">
      <el-radio-button
        v-for="i in options"
        v-bind="$attrs"
        :key="i.value"
        :label="i.value"
        :disabled="i.disabled"
      >
        {{ i.label }}
      </el-radio-button>
    </template>
    <template v-else>
      <el-radio
        v-for="i in options"
        v-bind="$attrs"
        :key="i.value"
        :label="i.value"
        :disabled="i.disabled"
      >
        {{ i.label }}
      </el-radio>
    </template>
  </el-radio-group>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  interface RadioItem {
    label: string
    value: string | number
    disabled: boolean
  }
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<RadioItem[]>,
      default: () => [],
    },
    isButton: {
      type: Boolean,
      default: false,
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
