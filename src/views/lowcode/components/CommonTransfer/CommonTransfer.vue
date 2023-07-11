<!--
 * @Author: cola
 * @Date: 2023-07-10 18:01:42
 * @LastEditors: cola
 * @Description:
-->
<!-- eslint-disable vue/valid-v-model -->
<template>
  <el-transfer v-bind="$attrs" />
</template>

<script setup lang="ts"></script>

<script lang="ts">
  import mixin from '../../mixins/index'
  export default defineComponent({
    name: 'CommonTransfer',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
