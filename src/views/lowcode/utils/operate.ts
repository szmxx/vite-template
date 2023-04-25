/*
 * @Author: cola
 * @Date: 2023-03-20 20:58:08
 * @LastEditors: cola
 * @Description:
 */
import { IComponentPanelItemChild } from '../types'
import { uniqueId, cloneDeep } from 'lodash'
import { recursion, cloneExcludeKeys } from './util'
import useStore from '@/store/lowcode'
const store = useStore()

export async function append(
  list: IComponentPanelItemChild[],
  data: string,
  containerData?: Record<string, unknown>
) {
  try {
    const obj = JSON.parse(data)
    if (obj && typeof obj === 'object') {
      obj.id = uniqueId()
      // 如果是容器节点，则设置容器
      if (obj.isGroup) {
        if (obj.isMulti) {
          obj.children = {}
        } else {
          obj.children = []
        }
      }
      list.push(obj)
    }
    if (!store.config[obj.id]) {
      let config = {
        default: {},
      }
      if (obj.isGroup) {
        config = await import(`../containers/${obj.component}/config.ts`)
      } else {
        config = await import(`../components/${obj.component}/config.ts`)
      }
      const res = cloneExcludeKeys(obj, [
        'title',
        'component',
        'icon',
        'id',
        'isGroup',
        'children',
      ])
      store.setComponentConfig(
        obj.id,
        reactive(Object.assign({}, config.default, res))
      )
      store.setModel(obj.id, '')
      if (containerData) {
        store.setFormItemConfig(
          obj.id,
          reactive(Object.assign({}, containerData))
        )
      }
    }
    // 等配置更新完，再压入栈中
    store.pushHistoryStack()
  } catch {
    console.log()
  }
}

export async function copy(
  list: IComponentPanelItemChild[],
  data: string,
  containerData?: Record<string, unknown>
) {
  try {
    const obj = JSON.parse(data)
    if (obj && typeof obj === 'object') {
      // 克隆时，重新设置 id
      recursion([obj], (i) => {
        if (store.config[i.id as string]) {
          const newId = uniqueId()
          store.setComponentConfig(
            newId,
            cloneDeep(store._componentConfig[i.id as string])
          )
          store.setEventConfig(
            newId,
            cloneDeep(store._eventConfig[i.id as string])
          )
          store.setStyleConfig(
            newId,
            cloneDeep(store._styleConfig[i.id as string])
          )
          store.setModel(newId, cloneDeep(store._model[i.id as string]))
          if (containerData) {
            store.setFormItemConfig(
              newId,
              cloneDeep(store._formItemConfig[i.id as string])
            )
          }
          i.id = newId
        }
      })
      list.push(obj)
    }
    // 等配置更新完，再压入栈中
    store.pushHistoryStack()
  } catch {
    console.log()
  }
}

export async function remove(
  list: IComponentPanelItemChild[],
  data: IComponentPanelItemChild
) {
  const index = list.findIndex((item) => {
    return item.id === data.id
  })
  if (index !== -1) {
    // 需要先删配置
    if (data.id && store.config[data.id as string]) {
      store.removeId(data.id as string)
    }
    list.splice(index, 1)
  }
  store.pushHistoryStack()
}

export function cancel() {
  store.setCurrent('')
}

export function clear() {
  store
}
export function up(
  list: IComponentPanelItemChild[],
  current: IComponentPanelItemChild
) {
  const index = list.findIndex((i) => {
    return i === current
  })
  if (list[index - 1]) {
    exchange(list, index - 1, index)
  }
}

export function down(
  list: IComponentPanelItemChild[],
  current: IComponentPanelItemChild
) {
  const index = list.findIndex((i) => {
    return i === current
  })
  if (list[index + 1]) {
    exchange(list, index + 1, index)
  }
}

export function exchange(
  list: IComponentPanelItemChild[],
  i: number,
  j: number
) {
  ;[list[i], list[j]] = [list[j], list[i]]
  store.pushHistoryStack()
}
