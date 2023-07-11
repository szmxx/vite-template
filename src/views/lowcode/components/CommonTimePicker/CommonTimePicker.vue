<!--
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
-->
<!--
 * @Author: cola
 * @Date: 2023-03-20 20:09:55
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-time-picker v-model="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
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

<script lang="ts">
  import mixin from '../../mixins/index'
  export default defineComponent({
    name: 'CommonTimePicker',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
