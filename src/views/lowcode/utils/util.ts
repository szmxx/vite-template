import {
  CONTAINER_COMPONENT_MAP,
  COMPONENT_CONTAINER_MAP,
} from './../sfc/constants'

import { IComponentPanelItemChild, IHasChildren } from '../types'
export function importJson() {
  console.error()
}
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

export function transformImportComponentTree(tree: Record<string, unknown>[]) {
  recursion(tree, (item) => {
    if (item.isGroup) {
      item.component =
        COMPONENT_CONTAINER_MAP[
          item.component as keyof typeof COMPONENT_CONTAINER_MAP
        ]
    }
  })
}
export function transformExportComponentTree(tree: Record<string, unknown>[]) {
  recursion(tree, (item) => {
    if (item.isGroup) {
      item.component =
        CONTAINER_COMPONENT_MAP[
          item.component as keyof typeof CONTAINER_COMPONENT_MAP
        ]
    }
  })
}

export function traverseFind(
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
      target = traverseFind(
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

export function findLastNode(arr: IHasChildren[]): IHasChildren {
  const last = arr[arr.length - 1]
  if (last && last.children) {
    return findLastNode(last.children)
  }
  return last
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
