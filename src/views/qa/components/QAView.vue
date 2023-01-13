<!--
 * @Author: cola
 * @Date: 2022-12-22 15:05:05
 * @LastEditors: cola
 * @Description: 问题浏览更新页面
-->
<template>
  <div class="qa-view p-4">
    <QACreate></QACreate>
  </div>
</template>

<script setup lang="ts">
  import QACreate from './QACreate.vue'
  import { QA_KEY } from '../constants'
  import { IQAItem } from '../types'
  const model = ref({})
  const list = JSON.parse(localStorage.getItem(QA_KEY) || '[]')
  const route = useRoute()
  const { id } = route.params
  model.value = list.find((i: IQAItem) => i.key === id) || {}
</script>
