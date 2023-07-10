<!--
 * @Author: cola
 * @Date: 2022-11-01 09:49:34
 * @LastEditors: cola
 * @Description
-->
<template>
  <el-drawer
    v-model="isShowDraw"
    :size="formConfig.panelWidth"
    :direction="(direction as any)"
    :show-close="false"
    :before-close="handleClose"
  >
    <template #header="{ close, titleId, titleClass }">
      <h4 :id="titleId" :class="titleClass">可视化配置面板</h4>
      <el-button size="small" type="primary" @click="fieldHandler">
        <i class="i-mdi-square-edit-outline" />
      </el-button>
      <el-button size="small" type="primary" @click="configHandler">
        <i class="i-carbon-settings" />
      </el-button>
      <el-button
        v-show="current === 'home'"
        size="small"
        type="danger"
        @click="close"
      >
        <i class="i-carbon-close" />
      </el-button>
      <el-button
        v-show="current !== 'home'"
        size="small"
        type="info"
        @click="backHandler"
      >
        <i class="i-carbon-arrow-left" />
      </el-button>
    </template>
    <VisualForm
      v-show="current === 'home'"
      ref="visualHomeForm"
      type="home"
      :form-data="formData"
      :form-model="formModel"
      :form-config="formConfig"
      :component-config="componentConfig"
    ></VisualForm>
    <VisualForm
      v-show="current === 'config'"
      ref="visualConfigForm"
      type="config"
      :form-data="formConfigData"
      :form-model="formConfigModel"
    ></VisualForm>
    <VisualForm
      v-show="current === 'field'"
      ref="visualFieldForm"
      type="field"
      :form-data="formFieldData"
      :form-model="formFieldModel"
      :form-config="formConfig"
    ></VisualForm>
    <template #footer>
      <el-button v-show="current === 'home'" type="info" @click="resetHandler">
        重置
      </el-button>
      <el-button type="primary" :loading="submitLoading" @click="submitHandler">
        提交
      </el-button>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
  import { ComponentInternalInstance, PropType } from 'vue'
  import {
    transform,
    parseModel,
    mergeField,
    getDefaultField,
    getComponentConfig,
    DEFAULT_FORM_CONFIG,
    DEFAULT_FIELD_CONFIG,
  } from '../utils'
  import { FormConfig } from '../types'
  import VisualForm from './VisualForm.vue'
  import localStorageUtil from '@/utils/localStorageUtil'
  type VisualFormCtx = InstanceType<typeof VisualForm>
  const direction = ref('rtl')
  const current = ref('home')
  const visualHomeForm = ref<VisualFormCtx>()
  const visualConfigForm = ref<VisualFormCtx>()
  const visualFieldForm = ref<VisualFormCtx>()
  const submitLoading = ref(false)
  const { proxy } = getCurrentInstance() as ComponentInternalInstance
  const emit = defineEmits(['update:modelValue'])
  const props = defineProps({
    modelValue: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {
        return {}
      },
    },
    formId: {
      type: String,
      default: 'DEFAULT',
    },
  })
  const FORM_FIELD = props.formId + 'FORM_FIELD'
  const FORM_CONFIG = props.formId + 'FORM_CONFIG'
  const FORM_MODEL = props.formId + 'FORM_MODEL'

  const isShowDraw = computed({
    get: () => {
      return props.modelValue
    },
    set(value) {
      emit('update:modelValue', value)
    },
  })

  // 表单字段中文映射
  const filed = localStorageUtil.getItem(FORM_FIELD)
  const formFieldModel = mergeField(DEFAULT_FIELD_CONFIG, filed) as Record<
    string,
    string
  >
  // 表单可视化
  const formModel = ref<Record<string, unknown>>({})
  const formData = transform(props.data, formFieldModel)
  parseModel(formData, formModel.value)
  const model = localStorageUtil.getItem(FORM_MODEL)
  formModel.value = mergeField(formModel.value, model)

  // 表单组件配置
  const componentConfig = getComponentConfig(formData, {})

  // 表单字段
  const formField = getDefaultField(formData, {})
  const formFieldData = transform(
    Object.assign({}, formField, formFieldModel),
    {}
  )
  // 表单配置
  const config = localStorageUtil.getItem(FORM_CONFIG)
  const formConfigModel = mergeField(DEFAULT_FORM_CONFIG, config)
  const formConfig = ref<FormConfig>(formConfigModel)
  const formConfigData = transform(formConfigModel, formFieldModel)
  parseModel(formConfigData, formConfigModel)

  function handleClose(done: () => void) {
    proxy
      ?.$confirm('数据未保存，是否确认关闭！', {
        type: 'warning',
        title: '关闭面板',
      })
      .then(() => {
        done()
      })
  }
  function configHandler() {
    current.value = 'config'
  }
  function fieldHandler() {
    current.value = 'field'
  }
  function backHandler() {
    current.value = 'home'
  }
  function submitHandler() {
    submitLoading.value = true
    let model
    switch (current.value) {
      case 'home':
        model = visualHomeForm?.value?.getFormModel()
        localStorageUtil.setItem(FORM_MODEL, model)
        break
      case 'config':
        model = visualConfigForm?.value?.getFormModel()
        formConfig.value = model as FormConfig
        localStorageUtil.setItem(FORM_CONFIG, model)
        break
      case 'field':
        model = visualFieldForm?.value?.getFormModel()
        localStorageUtil.setItem(FORM_FIELD, model)
        break
    }
    setTimeout(() => {
      submitLoading.value = false
    }, 100)
  }
  function resetHandler() {
    proxy
      ?.$confirm('表单数据将会被清空！', {
        type: 'warning',
        title: '重置表单',
      })
      .then(() => {
        visualHomeForm?.value?.resetFormModel()
      })
  }
</script>
