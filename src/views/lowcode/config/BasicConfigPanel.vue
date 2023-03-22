<!--
 * @Author: cola
 * @Date: 2023-03-21 10:07:15
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-collapse v-model="activeNames" class="mb-16">
    <el-collapse-item
      v-for="item in list"
      v-show="item.isShow"
      :key="item.name"
      :name="item.name"
      :title="item.title"
    >
      <component
        :is="item.component"
        v-if="item.isShow"
        :ref="item.ref"
        :config="item.config"
        :styles="panelConfig"
      ></component>
    </el-collapse-item>
  </el-collapse>
  <div
    v-if="store.current"
    class="flex w-[20rem] items-center border-t-1 border-#eee justify-end fixed bottom-0 right-0 h-16 bg-white"
  >
    <el-button type="primary" class="mr-4" @click="saveHandler">
      保存配置
    </el-button>
  </div>
</template>

<script setup lang="ts">
  import useStore from '@/store/lowcode'
  import { isEmpty } from 'lodash'
  import FieldComponent from '../FieldComponent'
  import {
    DEFAULT_EVENT_CONFIG,
    DEFAULT_STYLE_CONFIG,
    DEFAULT_CONFIG_PANEL_STYLE,
  } from './constants'
  const store = useStore()
  const basicRef = ref()
  const styleRef = ref()
  const formRef = ref()
  const eventRef = ref()
  const activeNames = ['basic']
  const list = reactive([
    {
      title: '基础属性',
      name: 'basic',
      component: FieldComponent,
      ref: 'basicRef',
      config: {},
      isShow: true,
    },
    {
      title: '表单属性',
      name: 'form',
      component: FieldComponent,
      ref: 'formRef',
      config: {},
      isShow: true,
    },
    {
      title: '样式属性',
      name: 'style',
      component: FieldComponent,
      ref: 'styleRef',
      config: {},
      isShow: true,
    },
    {
      title: '事件属性',
      name: 'event',
      component: FieldComponent,
      ref: 'eventRef',
      config: {},
      isShow: true,
    },
  ])
  const panelConfig = computed(() => {
    if (store.panelConfig && Object.keys(store.panelConfig)?.length) {
      return store.panelConfig
    }
    return DEFAULT_CONFIG_PANEL_STYLE
  })
  const componentConfig = computed(() => {
    if (store.current) {
      return store.componentConfig[store.current] || {}
    }
    return {}
  })
  const formItemConfig = computed(() => {
    if (store.current) {
      return store.formItemConfig[store.current] || {}
    }
    return {}
  })
  const styleConfig = computed(() => {
    if (store.current) {
      return store.styleConfig[store.current] || {}
    }
    return {}
  })

  const eventConfig = computed(() => {
    if (store.current) {
      return store.eventConfig[store.current] || {}
    }
    return {}
  })

  watch(componentConfig, (newVal) => {
    list[0].config = newVal
  })
  watch(formItemConfig, (newVal) => {
    if (newVal && Object.keys(newVal)?.length) {
      list[1].config = newVal
      list[1].isShow = true
    } else {
      list[1].isShow = false
    }
  })
  watch(styleConfig, (newVal) => {
    list[2].config = isEmpty(newVal)
      ? Object.assign({}, DEFAULT_STYLE_CONFIG)
      : newVal
  })
  watch(eventConfig, (newVal) => {
    list[3].config = isEmpty(newVal)
      ? Object.assign({}, DEFAULT_EVENT_CONFIG)
      : newVal
  })
  async function saveHandler() {
    const component = await basicRef?.value?.[0]?.submit?.()
    if (component) {
      store.setComponentConfig(store.current, component.value || component)
    }

    const form = await formRef?.value?.[0]?.submit?.()
    if (form) {
      store.setFormItemConfig(store.current, form.value || form)
    }

    const style = await styleRef?.value?.[0]?.submit?.()
    if (style) {
      store.setStyleConfig(store.current, style.value || style)
    }

    const event = await eventRef?.value?.[0]?.submit?.()
    if (event) {
      store.setEventConfig(store.current, event.value || event)
    }
  }
</script>
