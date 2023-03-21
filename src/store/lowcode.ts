/*
 * @Author: cola
 * @Date: 2022-07-05 14:40:02
 * @LastEditors: cola
 * @Description:
 */
import { defineStore } from 'pinia'
import { merge } from 'lodash'
export default defineStore('lowcode', {
  state: () => {
    return {
      _current: '', // 当前选中组件
      _componentConfig: {} as Record<string, Record<string, unknown>>,
      _styleConfig: {} as Record<string, Record<string, unknown>>,
      _eventConfig: {} as Record<string, Record<string, unknown>>,
      _formItemConfig: {} as Record<string, Record<string, unknown>>,
      _model: {} as Record<string, unknown>, // 组件的值
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
