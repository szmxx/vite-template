<!--
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
-->
<script lang="ts" setup>
  import { activateLocale, getI18nComponent } from '@/locales'
  const locale = ref()
  watch(
    () => activateLocale.value,
    (newVal) => {
      locale.value = getI18nComponent(newVal)
    },
    {
      immediate: true,
    }
  )
</script>

<template>
  <el-config-provider :locale="locale">
    <router-view></router-view>
  </el-config-provider>
</template>
