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
    <div>
      <el-button type="primary">{{ $t('common.button') }}</el-button>
      <el-input></el-input>
      <div>{{ $t('el.cascader.noData') }}</div>
      <el-pagination :total="100" />
    </div>
  </div>
</template>

<script setup lang="ts">
  const { x, y } = useMouse()
</script>
