import { treeProps } from './props'

import type { ExtractPropTypes } from 'vue'

export interface MenuMeta {
  icon: string
}
export interface TreeItem {
  id: string
  title: string
  children?: TreeItem[]
  meta?: MenuMeta
  expand?: boolean
  group?: boolean
  checked?: boolean
  indeterminate?: boolean
}

export type TreeProps = ExtractPropTypes<typeof treeProps>
