/*
 * @Author: cola
 * @Date: 2023-03-20 20:58:08
 * @LastEditors: cola
 * @Description:
 */
import { IComponentPanelItemChild } from '../types'
import { uniqueId } from 'lodash'
import useStore from '@/store/lowcode'
const store = useStore()

export function cloneExcludeKeys(obj: Record<string, unknown>, keys: string[]) {
  const res = Object.create(null)
  Object.keys(obj).map((key) => {
    if (!keys.includes(key)) {
      res[key] = obj[key]
    }
  })
  return res
}

export function cloneIncludeKeys(obj: Record<string, unknown>, keys: string[]) {
  const res = Object.create(null)
  Object.keys(obj).map((key) => {
    if (keys.includes(key)) {
      res[key] = obj[key]
    }
  })
  return res
}

export async function append(
  list: IComponentPanelItemChild[],
  data: string,
  containerData?: Record<string, unknown>
) {
  try {
    const obj = JSON.parse(data)
    if (obj && typeof obj === 'object') {
      obj.id = uniqueId()
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
      ])
      store.setComponentConfig(
        obj.id,
        reactive(Object.assign({}, config.default, res))
      )
      if (containerData) {
        store.setFormItemConfig(
          obj.id,
          reactive(Object.assign({}, containerData))
        )
      }
    }
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
    list.splice(index, 1)
  }
  if (data.id && store.config[data.id as string]) {
    store.removeId(data.id as string)
  }
}
