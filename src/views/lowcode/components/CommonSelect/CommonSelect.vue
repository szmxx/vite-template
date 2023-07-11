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
  export default defineComponent({
    name: 'CommonSelect',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
