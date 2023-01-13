<!--
 * @Author: cola
 * @Date: 2022-12-22 14:22:45
 * @LastEditors: cola
 * @Description: 问题创建页面
-->
<template>
  <el-form ref="formRef" :model="formModel" :rules="formRules">
    <el-form-item label="问题名称" prop="name">
      <global-input v-model="formModel.name" class="w-full" />
    </el-form-item>
    <el-form-item label="问题分类" prop="type">
      <global-select
        v-model="formModel.type"
        class="w-full"
        :options="typeList"
      />
    </el-form-item>
    <el-form-item label="问题答案" prop="answer">
      <global-editor v-model="formModel.answer" :height="200" />
    </el-form-item>
    <el-form-item>
      <div class="center w-full">
        <global-button size="large" @click="emit('cancel')">取消</global-button>
        <global-button
          class="text-white"
          size="large"
          type="primary"
          @click="submit"
          >创建</global-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { FormInstance, FormRules } from 'element-plus'
  interface FormModel {
    name: string
    type: string
    answer: string
  }

  const emit = defineEmits(['create', 'cancel'])
  const formRef = ref<FormInstance>()
  const formModel = reactive<FormModel>({
    name: '',
    type: '',
    answer: '',
  })

  const typeList = reactive([
    {
      label: '致命',
      value: 0,
    },
    {
      label: '严重',
      value: 1,
    },
    {
      label: '一般',
      value: 2,
    },
  ])
  const formRules = reactive<FormRules>({
    name: [
      {
        required: true,
        message: '请输入问题名称',
        trigger: 'blur',
      },
    ],
    type: [
      {
        required: true,
        message: '请选择问题分类',
        trigger: 'change',
      },
    ],
    answer: [
      {
        required: true,
        message: '请输入问题答案',
        trigger: 'blur',
      },
      {
        validator: answerValidator,
        trigger: 'blur',
      },
    ],
  })
  function answerValidator(rule: any, value: any, callback: any) {
    if (value === '<p><br></p>') {
      return callback(new Error('请输入问题答案'))
    }
    callback()
  }
  function submit() {
    formRef.value?.validate((bool) => {
      if (bool) {
        emit('create', formModel)
      }
    })
  }
</script>
