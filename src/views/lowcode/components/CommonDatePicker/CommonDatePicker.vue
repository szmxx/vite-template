<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-date-picker v-model="value" :type="type as any" />
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'date',
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
    name: 'CommonDatePicker',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
