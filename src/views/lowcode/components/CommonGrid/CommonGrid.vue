<!--
 * @Author: cola
 * @Date: 2023-03-30 00:21:41
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div v-bind="$attrs">
    <slot></slot>
  </div>
</template>

<script setup lang="ts"></script>

<script lang="ts">
  import mixin from '../../mixins/index'
  export default defineComponent({
    name: 'CommonGrid',
    mixins: [mixin],
    inheritAttrs: true,
  })
</script>
