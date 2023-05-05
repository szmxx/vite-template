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
        :config="item.config"
        :styles="panelConfig"
      ></component>
    </el-collapse-item>
  </el-collapse>
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
  const activeNames = ['basic']
  const list = reactive([
    {
      title: '基础属性',
      name: 'basic',
      component: FieldComponent,
      config: {},
      isShow: true,
    },
    {
      title: '表单属性',
      name: 'form',
      component: FieldComponent,
      config: {},
      isShow: true,
    },
    {
      title: '样式属性',
      name: 'style',
      component: FieldComponent,
      config: {},
      isShow: true,
    },
    {
      title: '事件属性',
      name: 'event',
      component: FieldComponent,
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
      const bool = isEmpty(store.styleConfig[store.current])
      if(bool) {
        store.setStyleConfig(store.current, DEFAULT_STYLE_CONFIG)
      }
      return store.styleConfig[store.current] || {}
    }
    return {}
  })

  const eventConfig = computed(() => {
    if (store.current) {
      const bool = isEmpty(store.eventConfig[store.current])
      if(bool) {
        store.setEventConfig(store.current, DEFAULT_EVENT_CONFIG)
      }
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
    list[2].config = newVal
  })
  watch(eventConfig, (newVal) => {
    list[3].config = newVal
  })
</script>
