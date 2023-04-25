<!--
 * @Author: cola
 * @Date: 2022-11-01 10:21:39
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-form
    ref="formRef"
    class="visual-form"
    :label-width="formConfig.labelWidth"
    :label-position="(formConfig.labelPosition as any)"
    :disabled="formConfig.disabled"
    :size="(formConfig.size as any)"
  >
    <VisualFormGroup :form-data="formData"></VisualFormGroup>
    <EditComponent
      v-if="isShowEditComponent"
      v-model="isShowEditComponent"
      :component-config="componentConfig[formItemKey]"
      @update="updateComponentConfig"
    ></EditComponent>
  </el-form>
</template>

<script setup lang="ts">
  import {
    FormModelKey,
    FormConfigKey,
    FormComponentKey,
  } from '../utils/inject'
  import { FormItem, FormConfig } from '../types'
  import { PropType } from 'vue'
  import VisualFormGroup from './VisualFormGroup.vue'
  import { getDefaultModel } from '../utils'
  import { cloneDeep } from 'lodash'
  import EditComponent from './EditComponent.vue'
  import EventBus from '@/utils/EventBus'
  const props = defineProps({
    formData: {
      type: Array as PropType<FormItem[]>,
      default: () => [],
    },
    formModel: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {
        return {}
      },
    },
    formConfig: {
      type: Object as PropType<FormConfig>,
      default: () => {
        return {}
      },
    },
    componentConfig: {
      type: Object as PropType<Record<string, Record<string, unknown>>>,
      default: () => {
        return {}
      },
    },
    type: {
      type: String,
      default: '',
    },
  })
  const formRef = ref()
  const isShowEditComponent = ref(false)
  const formItemKey = ref()
  const model = ref(cloneDeep(props.formModel))
  const componentConfig = ref(cloneDeep(props.componentConfig))
  provide(FormModelKey, model)
  provide(FormConfigKey, props.formConfig)
  provide(FormComponentKey, componentConfig)
  provide('FORM_TYPE', props.type)
  function resetFormModel() {
    const defaultModel = getDefaultModel(props.formData, {})
    model.value = cloneDeep(defaultModel)
    formRef?.value?.resetFields?.()
  }
  function getFormModel() {
    return cloneDeep(model.value)
  }
  function updateComponentConfig(value: Record<string, unknown>) {
    componentConfig.value[formItemKey?.value] = value
  }
  // 只有这个类型才需要监听
  if (props.type === 'home') {
    EventBus.on('ACTIVATE_COMPONENT', function (value) {
      isShowEditComponent.value = true
      formItemKey.value = value
    })
  }

  defineExpose({
    resetFormModel: resetFormModel,
    getFormModel: getFormModel,
  })
</script>
