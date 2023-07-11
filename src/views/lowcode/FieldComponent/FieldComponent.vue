<!--
 * @Author: cola
 * @Date: 2023-03-20 21:39:32
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-form ref="formRef" :model="formModel" :rules="formRules">
    <el-form-item v-for="i in list" :key="i.key" :label="i.label">
      <component
        v-bind="i"
        :is="i.component"
        v-model="formModel[i.key]"
        :__type__="i.key"
      ></component>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
  import { toRawType } from '@/utils'
  import {
    FieldItem,
    COMPONENT_TYPE_MAP,
    FIELD_MAP,
    SPECIAL_TYPE,
  } from './constants'
  import type { FormInstance, FormRules } from 'element-plus'
  import { PropType } from 'vue'

  const list = ref<FieldItem[]>([])
  const formRef = ref<FormInstance>()
  const formModel = ref<Record<string, unknown>>({})
  const formRules = ref<FormRules>({})

  const props = defineProps({
    config: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {
        // pass
      },
    },
    styles: {
      type: Object as PropType<Record<string, unknown>>,
      default: () => {
        // pass
      },
    },
  })
  watch(
    () => props.config,
    (newVal) => {
      if (newVal) {
        reset()
        transformField(newVal)
      }
    },
    {
      immediate: true,
      deep: true,
    }
  )

  defineExpose({
    submit: submit,
  })

  function transformField(config: Record<string, unknown>) {
    const keys = Object.keys(config)
    if (keys?.length) {
      for (let i = 0; i < keys.length; i++) {
        // 如果是特殊元素
        if (SPECIAL_TYPE[keys[i]]) {
          list.value.push({
            label: FIELD_MAP[keys[i]] || keys[i],
            key: keys[i],
            ...SPECIAL_TYPE[keys[i]],
            ...props.styles,
          })
        } else {
          const type = toRawType(config[keys[i]])
          const component = COMPONENT_TYPE_MAP[type]
          list.value.push({
            label: FIELD_MAP[keys[i]] || keys[i],
            component: component,
            key: keys[i],
            ...props.styles,
          })
        }
        formModel.value[keys[i]] = config[keys[i]]
      }
    }
  }
  function reset() {
    list.value = []
    formModel.value = {}
    formRules.value = {}
  }

  function submit() {
    return new Promise((resolve) => {
      formRef.value?.validate((bool) => {
        if (bool) {
          resolve(formModel)
        } else {
          resolve(false)
        }
      })
    })
  }
</script>
