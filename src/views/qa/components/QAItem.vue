<!--
 * @Author: cola
 * @Date: 2022-12-22 14:22:56
 * @LastEditors: cola
 * @Description: 问题子项
-->
<template>
  <div
    class="qa-item border-b cursor-pointer border-light py-4"
    @click="clickCallback"
  >
    <div class="qa-item-header flex flex-wrap items-center mb-2 gap-2">
      <div class="font-1000">{{ data.name }}</div>
      <el-tag :type="(typeMap[data.type].type as any)">
        {{ typeMap[data.type].label }}
      </el-tag>
      <el-tag :type="(statusMap[data.type].type as any)">
        {{ statusMap[data.type].label }}
      </el-tag>
      <div class="text-placeholder">{{ createTime }}</div>
    </div>
    <div class="qa-item-content">
      {{ data.answer }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import dayjs from 'dayjs'
  import { PropType } from 'vue'
  import { IQAItem } from '../types'
  const router = useRouter()

  const props = defineProps({
    data: {
      type: Object as PropType<IQAItem>,
      default: () => {},
    },
  })
  const createTime = computed(() =>
    dayjs(props.data.create_time).format('YYYY-MM-DD HH:mm:ss')
  )
  const typeMap = reactive<Record<number, Record<string, string>>>({
    0: {
      type: 'danger',
      label: '致命',
    },
    1: {
      type: 'warning',
      label: '严重',
    },
    2: {
      type: 'info',
      label: '一般',
    },
  })
  const statusMap = reactive<Record<number, Record<string, string>>>({
    0: {
      type: 'warning',
      label: '待处理',
    },
    1: {
      type: 'success',
      label: '已处理',
    },
    2: {
      type: 'info',
      label: '挂起',
    },
  })

  function clickCallback() {
    router.push({
      path: `/qa/view/${props.data.key}`,
    })
  }
</script>

<style lang="scss" scoped>
  @use '@/style/mixin.scss';

  .qa-item {
    &-title {
      @apply font-1000 mb-1;
    }

    &-content {
      @apply font-400 text-secondary;
      @include lineClamp(2);
    }
  }
</style>
