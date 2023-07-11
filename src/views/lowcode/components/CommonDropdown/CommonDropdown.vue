<!--
 * @Author: cola
 * @Date: 2023-03-20 15:41:31
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-dropdown v-bind="$attrs">
    <span class="inline-flex gap-x-1 items-center">
      {{ label }}
      <i i-carbon-chevron-down class="mr-1"></i>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="i in options"
          :key="i.value"
          :command="i.value"
          :disabled="i.disabled"
          :divide="i.divided"
          >{{ i.label }}</el-dropdown-item
        >
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  interface DropdownItem {
    label: string
    value: string | number
    disabled: boolean
    divided: boolean
  }
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    options: {
      type: Array as PropType<DropdownItem[]>,
      default: () => [],
    },
    label: {
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
