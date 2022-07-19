<!--
 * @Author: cola
 * @Date: 2022-07-11 18:31:07
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    class="flex justify-between h-[60px] w-full box-border items-center px-4 border-b border-dark-100"
  >
    <div>{{ title }}</div>
    <SvgIcon
      :name="theme"
      class="cursor-pointer"
      @click="toggleTheme"
    ></SvgIcon>
  </div>
</template>

<script setup lang="ts">
  import useStore from '@/store/app'
  const { config } = useStore()
  const title = config?.title
  const theme = ref('default')
  function toggleTheme() {
    theme.value = theme.value === 'default' ? 'dark' : 'default'
    useTheme(theme.value)
  }
</script>
