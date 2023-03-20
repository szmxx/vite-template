<!--
 * @Author: cola
 * @Date: 2023-03-20 15:41:31
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-dropdown v-bind="$attrs">
    <span class="el-dropdown-link">
      {{ label }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
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
  defineOptions({
    name: 'CommonRadio',
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
