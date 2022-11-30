<template>
  <div v-if="formData?.length" class="visual-form-group" :class="computedClass">
    <el-form-item v-if="formOptions?.label" :label="formOptions?.label">
    </el-form-item>
    <div :style="computedStyle" :class="formOptions?.label ? 'group' : ''">
      <VisualFormItem
        v-for="i in formData"
        :key="i.key"
        :form-item="i"
      ></VisualFormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { FormItem } from '../types'
  import { PropType } from 'vue'
  import VisualFormItem from './VisualFormItem.vue'
  import { FormConfigKey } from '../utils/inject'
  const props = defineProps({
    formData: {
      type: Array as PropType<FormItem[]>,
      default: () => [],
    },
    formOptions: {
      type: Object as PropType<FormItem>,
      default: () => {
        return {}
      },
    },
  })
  const config = inject(FormConfigKey)
  const computedClass = computed(() => {
    return (props?.formOptions?.level || 0) > 1
      ? `level-${props.formOptions.level}`
      : ''
  })
  const computedStyle = computed(() => {
    return {
      'margin-left':
        (props?.formOptions?.level || 0) > 0 ? config?.labelWidth : '',
    }
  })
</script>

<style scoped lang="scss">
  $base: 20px;
  @for $i from 1 through 9 {
    .level-#{$i} {
      margin-left: calc(20px * $i);
    }
  }

  .visual-form-group {
    &-label {
      height: 32px;
      font-size: var(--el-form-label-font-size);
      color: var(--el-text-color-regular);
      line-height: 32px;
    }
  }

  .group {
    margin-bottom: 18px;
    border: 1px solid var(--el-border-color-lighter);
    border-radius: 8px;
    padding: 18px 18px 0 0;
  }
</style>
