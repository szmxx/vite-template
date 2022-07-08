<!--
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
-->
<script lang="ts" setup>
  // import { defaultLang } from '@/locales'
  // const locale = computed(() => {
  //   const res = import.meta.globEager(
  //     `element-plus/es/locale/lang/${defaultLang.value?.toLowerCase()}`
  //   ).default
  //   return res
  // })
</script>

<template>
  <el-config-provider>
    <router-view></router-view>
  </el-config-provider>
</template>
