<!--
 * @Author: cola
 * @Date: 2023-03-20 15:37:30
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-checkbox-group v-model="value">
    <el-checkbox
      v-for="i in options"
      :key="i.value"
      :label="i.value"
      :disabled="i.disabled"
      >{{ i.label }}
    </el-checkbox>
  </el-checkbox-group>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  interface CheckItem {
    label: string
    value: string | number
    disabled: boolean
  }
  const props = defineProps({
    modelValue: {
      type: Array as PropType<string[] | number[]>,
      default: () => [],
    },
    options: {
      type: Array as PropType<CheckItem[]>,
      default: () => [],
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
  export default defineComponent({
    name: 'CommonCheckbox',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
