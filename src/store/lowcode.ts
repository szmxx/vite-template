import { IHasChildren } from './../views/lowcode/types'
/*
 * @Author: cola
 * @Date: 2022-07-05 14:40:02
 * @LastEditors: cola
 * @Description:
 */
import { defineStore } from 'pinia'
import { merge, cloneDeep } from 'lodash'
import { IComponentPanelItemChild } from '@/views/lowcode/types'
import { recursion, traverse } from '@/views/lowcode/utils/util'

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
      _maxLimitStack: 30, // 最大历史栈限制
      _historyStack: [[]] as IComponentPanelItemChild[][], // 历史栈结构
      _historyConfigStack: [{}] as Record<string, Record<string, unknown>>[], // 历史配置栈结构
      _currentStack: 0, // 当前栈
      _componentTree: [] as IComponentPanelItemChild[],
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
    componentTree: (state) => {
      return state._componentTree
    },
    undoDisabled: (state) => {
      return state._currentStack <= 0
    },
    redoDisabled: (state) => {
      return state._currentStack >= state._historyStack.length - 1
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
    pushHistoryStack() {
      // 处于回退状态
      if (this._currentStack < this._historyStack.length - 1) {
        this._historyStack.splice(
          this._currentStack + 1,
          this._historyStack.length - this._currentStack + 1,
          cloneDeep(this._componentTree)
        )
        this._historyConfigStack.splice(
          this._currentStack + 1,
          this._historyConfigStack.length - this._currentStack + 1,
          cloneDeep(this._componentConfig)
        )
      } else {
        this._historyConfigStack.push(cloneDeep(this._componentConfig))
        this._historyStack.push(cloneDeep(this._componentTree))
      }
      // 超过最大栈限制，需要移出第一项
      if (this._maxLimitStack < this._historyStack.length) {
        this._historyStack.shift()
        this._historyConfigStack.shift()
      }
      this._currentStack = this._historyStack.length - 1
    },
    redo() {
      if (this._currentStack < this._historyStack.length - 1) {
        this._currentStack++
        this._componentConfig = cloneDeep(
          this._historyConfigStack[this._currentStack]
        )
        return (this._componentTree = cloneDeep(
          this._historyStack[this._currentStack]
        ))
      }
      return null
    },
    undo() {
      if (this._currentStack > 0) {
        this._currentStack--
        this._componentConfig = cloneDeep(
          this._historyConfigStack[this._currentStack]
        )
        return (this._componentTree = cloneDeep(
          this._historyStack[this._currentStack]
        ))
      }
      return null
    },
    clear() {
      this._componentTree = []
      this.pushHistoryStack()
      return []
    },
    removeId(id: string) {
      const target = traverse(this._componentTree, id)
      if (target) {
        recursion([target], (item: IHasChildren) => {
          // TODO: 目前历史栈只支持回退组件配置，所以不能删除其他配置
          delete this._componentConfig[item.id as string]
        })
      }
    },
    setModel(key: string, value: unknown) {
      this._model[key] = value
    },
  },
})
