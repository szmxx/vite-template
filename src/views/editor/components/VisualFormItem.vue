<!--
 * @Author: cola
 * @Date: 2022-11-01 09:48:32
 * @LastEditors: cola
 * @Description:
-->
<!-- eslint-disable vue/no-mutating-props -->
<template>
  <VisualFormGroup
    v-if="formItem.component === 'visual-form-group'"
    :form-options="formItem"
    :form-data="formItem.value as FormItem[]"
  ></VisualFormGroup>
  <el-form-item
    v-else
    class="form-item"
    :prop="formItem.key"
    :label="formItem.label"
    @mouseenter="isHover = true"
    @mouseleave="isHover = false"
  >
    <component
      :is="formItem.component"
      v-model="value"
      :options="formItem.options"
      v-bind="config"
    ></component>
    <i
      v-if="type === 'home' && isHover"
      class="i-carbon-settings"
      @click="editHandler"
    ></i>
  </el-form-item>
</template>
<script setup lang="ts">
  import VisualFormGroup from './VisualFormGroup.vue'
  import { PropType } from 'vue'
  import { FormItem } from '../types'
  import { FormModelKey, FormComponentKey } from '../utils/inject'
  import { injectStrict } from '@/utils'
  import EventBus from '@/utils/EventBus'
  const formModel = injectStrict(FormModelKey)
  const componentConfig = injectStrict(FormComponentKey)
  const type = inject('FORM_TYPE')
  const isHover = ref(false)
  const props = defineProps({
    formItem: {
      type: Object as PropType<FormItem>,
      default: () => {
        return {}
      },
    },
  })
  const value = computed({
    get() {
      return formModel.value[props.formItem.key]
    },
    set(value) {
      formModel.value[props.formItem.key] = value
    },
  })
  const config = computed(() => {
    return componentConfig.value[props.formItem.key] || {}
  })
  function editHandler() {
    EventBus.emit('ACTIVATE_COMPONENT', props.formItem.key)
  }
</script>

<style scoped lang="scss">
  @use '@/style/mixin';

  .form-item {
    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-form-item__label) {
      @include textOverflow;
    }
    /* stylelint-disable-next-line selector-class-pattern */
    :deep(.el-form-item__content) {
      flex-wrap: nowrap;
      column-gap: 8px;
      width: 100%;

      & > i {
        cursor: pointer;
      }

      & > div {
        width: 100%;

        & > div {
          width: 100%;
        }
      }
    }
  }
</style>
