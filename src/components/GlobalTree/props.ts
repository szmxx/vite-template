/*
 * @Author: cola
 * @Date: 2022-07-30 01:29:59
 * @LastEditors: cola
 * @Description:
 */
import { TreeItem, MenuMeta } from './types'
import type { PropType } from 'vue'
export const groupProps = {
  data: {
    type: Array as PropType<TreeItem[]>,
    default: () => [],
  },
  level: {
    type: Number,
    default: 1,
  },
}
export const treeProps = {
  ...groupProps,
  ...{
    showCheckBox: {
      type: Boolean,
      default: false,
    },
    iconType: {
      type: String,
      default: 'left',
    },
    level: {
      type: Number,
      default: 0,
    },
  },
}
export const itemProps = {
  id: {
    type: [String, Number],
    default: '',
    required: true,
  },
  title: {
    type: String,
    default: '',
  },
  meta: {
    type: Object as PropType<MenuMeta>,
    default: () => {
      return {}
    },
  },
  expand: {
    type: Boolean,
    default: false,
  },
  group: {
    type: Boolean,
    default: false,
  },
  checked: {
    type: Boolean,
    default: false,
  },
  children: {
    type: Array as PropType<TreeItem[]>,
    default: () => [],
  },
}
