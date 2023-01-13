<!--
 * @Author: cola
 * @Date: 2022-12-21 10:10:07
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="qa">
    <div class="qa-header flex justify-between h-[4rem] items-center px-4">
      <div class="flex flex-nowrap items-center">
        <GlobalInput
          placeholder="Search"
          class="mr-4"
          @focus="focusFn"
        ></GlobalInput>
        <GlobalButton @click="createFn">检索</GlobalButton>
      </div>
      <GlobalButton @click="createFn">创建</GlobalButton>
    </div>
    <div class="qa-content px-4">
      <QAItem
        v-for="(i, index) in questionList"
        :key="i.key"
        :data="i"
        :class="index === 0 ? 'border-t border-light' : ''"
      ></QAItem>
    </div>
  </div>
  <!-- 创建问题弹窗 -->
  <el-dialog v-model="createVisible" title="创建问题">
    <QACreate
      @create="createCallback"
      @cancel="createVisible = false"
    ></QACreate>
  </el-dialog>
  <Teleport to="body">
    <QASearch v-model="searchVisible"></QASearch>
  </Teleport>
</template>

<script setup lang="ts">
  import { uniqueId } from 'lodash'
  import { ComponentInternalInstance } from 'vue'
  import QACreate from './components/QACreate.vue'
  import QAItem from './components/QAItem.vue'
  import QASearch from './components/QASearch.vue'
  import { IQAItem } from './types'
  import { QA_KEY } from './constants'
  const loading = ref(false)
  const createVisible = ref(false)
  const searchVisible = ref(false)
  const listOptions = ref()
  const { proxy } = getCurrentInstance() as ComponentInternalInstance
  const questionList = ref<IQAItem[]>([])
  function remoteMethod(query: string) {
    if (query) {
      loading.value = true
      setTimeout(() => {
        loading.value = false
        listOptions.value = []
      }, 200)
    } else {
      listOptions.value = []
    }
  }
  initListData()
  function initListData() {
    const list = JSON.parse(localStorage.getItem(QA_KEY) || '[]')
    questionList.value = list
  }
  function createFn() {
    createVisible.value = true
  }
  function createCallback(formModel: Record<string, unknown>) {
    const list = JSON.parse(localStorage.getItem(QA_KEY) || '[]')
    list.push({
      key: uniqueId(),
      name: formModel.name,
      type: formModel.type,
      answer: formModel.answer,
      create_time: new Date().getTime(),
      status: 0, // 待处理
    })
    localStorage.setItem(QA_KEY, JSON.stringify(list))
    createVisible.value = false
    proxy?.$message('创建成功！')
    initListData()
  }
  function focusFn() {
    searchVisible.value = true
  }
</script>

<script lang="scss" scoped></script>
