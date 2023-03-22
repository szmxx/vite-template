/*
 * @Author: cola
 * @Date: 2022-07-05 14:40:02
 * @LastEditors: cola
 * @Description:
 */
import { defineStore } from 'pinia'
import { merge, cloneDeep } from 'lodash'
import { IComponentPanelItemChild } from '@/views/lowcode/types'
export default defineStore('lowcode', {
  state: () => {
    return {
      _current: '', // 当前选中组件
      _componentConfig: {} as Record<string, Record<string, unknown>>, // 组件的基础配置
      _styleConfig: {} as Record<string, Record<string, unknown>>, // 组件样式的配置
      _eventConfig: {} as Record<string, Record<string, unknown>>, // 组件事件的配置
      _formItemConfig: {} as Record<string, Record<string, unknown>>, // 表单项的配置
      _model: {} as Record<string, unknown>, // 渲染组件的值
      _panelConfig: {} as Record<string, unknown>, // 配置面板的配置，作用于配置面板
      _globalConfig: {} as Record<string, unknown>, // 全局组件的配置
      _historyStack: [] as IComponentPanelItemChild[][], // 历史栈结构
      _currentStack: 0, // 当前节点
    }
  },
  getters: {
    current: (state) => {
      return state._current
    },
    config: (state) => {
      return merge(
        {},
        state._componentConfig,
        state._styleConfig,
        state._eventConfig
      )
    },
    componentConfig: (state) => {
      return state._componentConfig
    },
    styleConfig: (state) => {
      return state._styleConfig
    },
    eventConfig: (state) => {
      return state._eventConfig
    },
    formItemConfig: (state) => {
      return state._formItemConfig
    },
    panelConfig: (state) => {
      return state._panelConfig
    },
    globalConfig: (state) => {
      return state._globalConfig
    },
    model: (state) => {
      return state._model
    },
  },
  actions: {
    setCurrent(current: string) {
      this._current = current
    },
    setComponentConfig(id: string, config: Record<string, unknown>) {
      if (this._componentConfig[id]) {
        this._componentConfig[id] = Object.assign(
          {},
          this._componentConfig[id],
          config
        )
      } else {
        this._componentConfig[id] = config
      }
    },
    setStyleConfig(id: string, config: Record<string, unknown>) {
      if (this._styleConfig[id]) {
        this._styleConfig[id] = Object.assign({}, this._styleConfig[id], config)
      } else {
        this._styleConfig[id] = config
      }
    },
    setEventConfig(id: string, config: Record<string, unknown>) {
      if (this._eventConfig[id]) {
        this._eventConfig[id] = Object.assign({}, this._eventConfig[id], config)
      } else {
        this._eventConfig[id] = config
      }
    },
    setFormItemConfig(id: string, config: Record<string, unknown>) {
      if (this._formItemConfig[id]) {
        this._formItemConfig[id] = Object.assign(
          {},
          this._formItemConfig[id],
          config
        )
      } else {
        this._formItemConfig[id] = config
      }
    },
    setPanelConfig(config: Record<string, unknown>) {
      this._panelConfig = config
    },
    setGlobalConfig(config: Record<string, unknown>) {
      this._globalConfig = config
    },
    pushHistoryStack(data: IComponentPanelItemChild[]) {
      this._historyStack.push(cloneDeep(data))
      this._currentStack++
    },
    redo() {
      if (this._currentStack < this._historyStack.length) {
        this._currentStack++
        return this._historyStack[this._currentStack]
      }
      return null
    },
    undo() {
      if (this._currentStack > 0) {
        this._currentStack--
        return this._historyStack[this._currentStack]
      }
      return null
    },

    removeId(id: string) {
      delete this._eventConfig[id]
      delete this._styleConfig[id]
      delete this._componentConfig[id]
      delete this._formItemConfig[id]
      delete this._model[id]
    },
    setModel(key: string, value: unknown) {
      this._model[key] = value
    },
  },
})
