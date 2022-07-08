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
    <van-button type="primary">按钮</van-button>
    <van-number-keyboard></van-number-keyboard>
  </div>
</template>

<script setup lang="ts">
  const { x, y } = useMouse()
</script>
