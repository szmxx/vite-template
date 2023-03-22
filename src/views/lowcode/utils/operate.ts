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
      // 如果是容器节点，则设置容器
      if (obj.isGroup) {
        obj.children = []
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

export function cancel() {
  store.setCurrent('')
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
}
