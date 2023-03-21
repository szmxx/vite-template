<!--
 * @Author: cola
 * @Date: 2023-03-21 10:07:15
 * @LastEditors: cola
 * @Description:
-->
<template>
  <el-collapse v-model="activeNames" class="pb-16">
    <el-collapse-item
      v-for="item in list"
      :key="item.name"
      :name="item.name"
      :title="item.title"
    >
      <component
        :is="item.component"
        :ref="item.ref"
        :config="item.config"
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
  import { cloneExcludeKeys, cloneIncludeKeys } from '../utils/operate'
  import {
    DEFAULT_EVENT_CONFIG,
    DEFAULT_EVENT_KEYS,
    DEFAULT_STYLE_CONFIG,
    DEFAULT_STYLE_KEYS,
  } from './constants'
  const store = useStore()
  const basicRef = ref()
  const styleRef = ref()
  const eventRef = ref()
  const activeNames = ['basic']
  const list = reactive([
    {
      title: '基础属性',
      name: 'basic',
      component: FieldComponent,
      ref: 'basicRef',
      config: {},
    },
    {
      title: '样式属性',
      name: 'style',
      component: FieldComponent,
      ref: 'styleRef',
      config: {},
    },
    {
      title: '事件属性',
      name: 'event',
      component: FieldComponent,
      ref: 'eventRef',
      config: {},
    },
  ])
  const componentConfig = computed(() => {
    if (store.current) {
      return cloneExcludeKeys(
        store.config[store.current] || {},
        DEFAULT_STYLE_KEYS.concat(DEFAULT_EVENT_KEYS)
      )
    }
    return {}
  })
  const styleConfig = computed(() => {
    if (store.current) {
      return cloneIncludeKeys(
        store.config[store.current] || {},
        DEFAULT_STYLE_KEYS
      )
    }
    return {}
  })

  const eventConfig = computed(() => {
    if (store.current) {
      return cloneIncludeKeys(
        store.config[store.current] || {},
        DEFAULT_EVENT_KEYS
      )
    }
    return {}
  })
  watch(componentConfig, (newVal) => {
    list[0].config = newVal
  })

  watch(styleConfig, (newVal) => {
    list[1].config = isEmpty(newVal)
      ? Object.assign({}, DEFAULT_STYLE_CONFIG)
      : newVal
  })

  watch(eventConfig, (newVal) => {
    list[2].config = isEmpty(newVal)
      ? Object.assign({}, DEFAULT_EVENT_CONFIG)
      : newVal
  })

  async function saveHandler() {
    const component = await basicRef?.value?.[0]?.submit?.()
    if (component) {
      store.setConfig(store.current, component.value || component)
    }
    const style = await styleRef?.value?.[0]?.submit?.()
    if (style) {
      store.setConfig(store.current, style.value || style)
    }
    const event = await eventRef?.value?.[0]?.submit?.()
    if (event) {
      store.setConfig(store.current, event.value || event)
    }
  }
</script>
