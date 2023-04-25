<!--
 * @Author: cola
 * @Date: 2022-11-03 18:03:49
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-dialog
    align-center
    :model-value="modelValue"
    title="编辑属性"
    @close="closeHandler"
  >
    <VisualForm
      ref="visualComponentForm"
      :form-data="formData"
      :form-model="formModel"
    ></VisualForm>
    <template #footer>
      <div class="my-footer">
        <el-button type="info" @click="emit('update:modelValue', false)">
          取消
        </el-button>
        <el-button type="primary" @click="submitHandler"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
  import { PropType } from 'vue'
  import VisualForm from './VisualForm.vue'
  import { transform, parseModel } from '../utils'
  import { cloneDeep } from 'lodash'
  type VisualFormCtx = InstanceType<typeof VisualForm>
  const visualComponentForm = ref<VisualFormCtx>()
  const formModel = ref<Record<string, unknown>>({})
  const props = defineProps({
    componentConfig: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {
        return {}
      },
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
  })
  const data = cloneDeep(props.componentConfig)
  const formData = transform(data, {})
  parseModel(formData, formModel.value)
  const emit = defineEmits(['update', 'update:modelValue'])
  function submitHandler() {
    const model = visualComponentForm?.value?.getFormModel()
    emit('update', model)
    emit('update:modelValue', false)
  }
  function closeHandler() {
    emit('update:modelValue', false)
  }
</script>
