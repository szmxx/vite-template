<!--
 * @Author: cola
 * @Date: 2022-07-24 02:59:31
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="i-fy" @click="clickHandler">
    <div v-for="(i, index) in props.list" :key="i.name">
      <span
        class="text-placeholder"
        :class="{
          'text-bold text-regular cursor-pointer select-none': i?.path,
        }"
        :data-path="i.path"
      >
        {{ i.name }}
      </span>
      <span v-if="index !== list.length - 1" class="px-small">{{
        props.separator
      }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { breadcrumb } from './props'
  const props = defineProps(breadcrumb)
  const router = useRouter()
  function clickHandler(e: MouseEvent) {
    const el = e.target as HTMLElement
    const path = el.dataset.path
    if (path) {
      router.push({
        path: path,
      })
    }
  }
</script>
