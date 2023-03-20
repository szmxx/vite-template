/*
 * @Author: cola
 * @Date: 2022-07-05 14:40:02
 * @LastEditors: cola
 * @Description:
 */
import { defineStore } from 'pinia'
export default defineStore('lowcode', {
  state: () => {
    return {
      _current: '', // 当前选中组件
      _config: {} as Record<string, Record<string, unknown>>, // 组件的配置
      _model: {} as Record<string, unknown>, // 组件的值
    }
  },
  getters: {
    current: (state) => {
      return state._current
    },
    config: (state) => {
      return state._config
    },
    model: (state) => {
      return state._model
    },
  },
  actions: {
    setCurrent(current: string) {
      this._current = current
    },
    setConfig(id: string, config: Record<string, unknown>) {
      this._config[id] = config
    },
    removeId(id: string) {
      delete this._config[id]
    },
    setModel(key: string, value: unknown) {
      this._model[key] = value
    },
  },
})
