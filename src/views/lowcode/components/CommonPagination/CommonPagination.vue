<!--
 * @Author: cola
 * @Date: 2023-03-20 15:46:06
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-pagination v-model:current-page="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Number,
      default: 1,
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
    name: 'CommonPagination',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
