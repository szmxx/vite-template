<!--
 * @Author: cola
 * @Date: 2022-12-22 15:14:05
 * @LastEditors: cola
 * @Description: 问题搜索
-->
<template>
  <div
    v-show="visible"
    class="bg-[rgba(255,255,255,0.8)] z-[9999] absolute w-full h-full top-0 left-0"
    @click="visible = false"
  >
    <div class="qa-search" @click.stop="">
      <GlobalInput
        v-model="inputVal"
        class="qa-search-input"
        closeable
      ></GlobalInput>
      <div class="qa-search-content">
        <QASearchItem v-for="i in list" :key="i.key" :data="i"></QASearchItem>
      </div>
      <div class="qa-search-footer flex items-center">
        <KbdItem text="to select" class="mr-[0.8em]">
          <span class="i-mdi-arrow-left-bottom"></span>
        </KbdItem>
        <KbdItem>
          <span class="i-mdi-arrow-down-thin"></span>
        </KbdItem>
        <KbdItem text="to navigate" class="mr-[0.8em]">
          <span class="i-mdi-arrow-up-thin"></span>
        </KbdItem>
        <KbdItem text="to close">
          <span class="i-mdi-keyboard-esc"></span>
        </KbdItem>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import KbdItem from './KbdItem.vue'
  import { QA_KEY } from '../constants'
  import { IQAItem } from '../types'
  import QASearchItem from './QASearchItem.vue'
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['update:modelValue'])
  const visible = computed({
    get() {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  const inputVal = ref('')
  const allList = JSON.parse(localStorage.getItem(QA_KEY) || '[]')
  const list = ref<IQAItem[]>([])
  watch(inputVal, (newVal) => {
    list.value = allList.find(
      (item: IQAItem) =>
        item?.name?.indexOf(newVal) > -1 || item?.answer?.indexOf(newVal) > -1
    )
  })
</script>

<style lang="scss" scoped>
  .qa-search {
    margin: 50px auto auto;
    border-radius: 6px;
    padding: 12px 12px 0;
    max-width: 560px;
    background: #fafafa;
    box-shadow: 0 12px 32px 4px rgb(0 0 0 / 4%), 0 8px 20px rgb(0 0 0 / 8%);

    :deep(&-input) {
      border: 0;
      height: 56px;
    }

    &-content {
      min-height: 200px;
      max-height: 200px;
    }

    &-footer {
      position: relative;
      border-radius: 0 0 8px 8px;
      padding: 0 12px;
      height: 44px;
    }
  }
</style>
