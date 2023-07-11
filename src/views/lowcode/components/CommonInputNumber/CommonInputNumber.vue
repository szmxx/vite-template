<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-input-number v-model="value" />
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 0,
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
    name: 'CommonInputNumber',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
