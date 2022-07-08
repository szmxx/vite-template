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
  <div>
    <a-button type="primary">按钮</a-button>
    <a-input></a-input>
  </div>
</template>

<script setup lang="ts">
  const { x, y } = useMouse()
</script>
