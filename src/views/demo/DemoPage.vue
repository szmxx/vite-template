<!--
 * @Author: cola
 * @Date: 2022-07-05 10:27:53
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div>
    {{ x }}
    {{ y }}
  </div>
</template>

<script setup lang="ts">
  const { x, y } = useMouse()
</script>
