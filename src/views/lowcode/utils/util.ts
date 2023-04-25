/*
 * @Author: cola
 * @Date: 2023-03-23 21:01:43
 * @LastEditors: cola
 * @Description:
 */
import { IComponentPanelItemChild, IHasChildren } from '../types'
export function importJson() {}
export function exportJson(
  json: Record<string, unknown> | Record<string, unknown>[],
  filename: string
) {
  const blob = new Blob([JSON.stringify(json)], { type: 'application/json' })
  const blobUrl = URL.createObjectURL(blob)
  download(blobUrl, filename)
}

export function download(blobUrl: string, downloadName: string) {
  const a = document.createElement('a')
  a.download = downloadName
  a.href = blobUrl
  a.click()
  URL.revokeObjectURL(blobUrl)
}

export function traverse(
  list: IComponentPanelItemChild[],
  id: string
): IComponentPanelItemChild | null {
  let target = null
  for (let i = 0; i < list.length; i++) {
    if (list[i].id === id) {
      target = list[i]
      break
    }
    if (list[i].children) {
      target = traverse(
        list[i].children as unknown as IComponentPanelItemChild[],
        id
      )
    }
  }
  return target
}

export function recursion(
  arr: IHasChildren[],
  callback: (arg: IHasChildren) => void
) {
  arr.map((i: IHasChildren) => {
    callback(i)
    if (i?.children?.length) {
      recursion(i.children, callback)
    }
  })
}

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
