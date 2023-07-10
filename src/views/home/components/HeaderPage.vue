<!--
 * @Author: cola
 * @Date: 2022-07-11 18:31:07
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div
    class="flex justify-between h-[60px] w-full box-border items-center px-4 border-b border-#ccc"
  >
    <div v-tooltip="title">{{ title }}</div>
    <div
      v-if="theme === 'dark'"
      class="cursor-pointer i-carbon-light"
      @click="toggleTheme"
    ></div>
    <div
      v-else
      class="cursor-pointer i-carbon-asleep"
      @click="toggleTheme"
    ></div>
  </div>
</template>

<script setup lang="ts">
  import useStore from '@/store/app'
  const { config } = useStore()
  const title = config?.title
  const theme = computed(() => currentTheme.value)
  function toggleTheme() {
    useTheme(theme.value === 'default' ? 'dark' : 'default')
  }
</script>
