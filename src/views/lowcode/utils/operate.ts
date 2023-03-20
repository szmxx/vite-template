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
export async function append(list: IComponentPanelItemChild[], data: string) {
  try {
    const obj = JSON.parse(data)
    if (obj && typeof obj === 'object') {
      obj.id = uniqueId()
      list.push(obj)
    }
    if (!store.config[obj.id]) {
      const config = await import(`../components/${obj.component}/config.ts`)
      store.setConfig(obj.id, reactive(config.default))
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
  if (data.id && store.config[data.id]) {
    store.removeId(data.id)
  }
}
