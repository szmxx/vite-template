<!--
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
-->
<!--
 * @Author: cola
 * @Date: 2023-03-20 16:07:24
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-select v-model="value" v-bind="$attrs">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value"
      :disabled="item.disabled"
    />
  </el-select>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  interface SelectItem {
    label: string
    value: string | number
    disabled: boolean
  }
  const props = defineProps({
    modelValue: {
      type: [String, Number, Array, Boolean, Object],
      default: '',
    },
    options: {
      type: Array as PropType<SelectItem[]>,
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
  defineComponent({
    name: 'CommonSelect',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
