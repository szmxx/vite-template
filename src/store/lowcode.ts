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
      _current: null, // 当前选中组件
    }
  },
  getters: {
    current: (state) => {
      return state._current
    }
  },
  actions: {
    setCurrent(current) {
      this._current = current
    },
  },
})
