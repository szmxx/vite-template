<!--
 * @Author: cola
 * @Date: 2022-07-26 22:15:06
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div>
    {{ content }}
  </div>
</template>

<script setup lang="ts">
  defineProps({
    content: {
      type: String,
      default: '',
    },
  })
</script>
