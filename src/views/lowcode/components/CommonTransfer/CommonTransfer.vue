<!--
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
-->
<!--
 * @Author: cola
 * @Date: 2023-03-20 16:03:40
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-transfer v-model="value" v-bind="$attrs" />
</template>

<script setup lang="ts">
  const props = defineProps({
    modelValue: {
      type: Array,
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
    name: 'CommonTransfer',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
