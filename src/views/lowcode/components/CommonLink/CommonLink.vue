<template>
  <el-link v-bind="$attrs">{{ label }}</el-link>
</template>

<script setup lang="ts">
  defineProps({
    label: {
      type: String,
      default: '示例文本',
    },
  })
</script>

<script lang="ts">
  import mixin from '../../mixins/index'
  export default defineComponent({
    name: 'CommonLink',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
