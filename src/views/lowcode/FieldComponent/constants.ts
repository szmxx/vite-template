/*
 * @Author: cola
 * @Date: 2023-03-20 21:46:35
 * @LastEditors: cola
 * @Description:
 */
import EditField from './components/EditField.vue'
export interface BasicItem {
  label: string
  value: unknown
}
export interface FieldItem {
  label: string
  component: string | unknown
  key: string
}

export interface SPECIAL_TYPE_ITEM {
  component: string
  options: BasicItem[]
  [key: string]: string | boolean | BasicItem[]
}

export const COMPONENT_TYPE_MAP: Record<string, unknown> = {
  Number: 'CommonInputNumber',
  String: 'CommonInput',
  Boolean: 'CommonSwitch',
  Object: EditField,
  Array: EditField,
  Function: EditField,
  Undefined: 'CommonInput',
  Null: 'CommonInput',
}

export const FIELD_MAP: Record<string, string> = {
  size: '大小',
  __INNERKEY__: '字段键名',
}

export const SPECIAL_TYPE: Record<string, SPECIAL_TYPE_ITEM> = {
  size: {
    component: 'CommonRadio',
    options: [
      {
        label: '默认',
        value: 'default',
      },
      {
        label: '大',
        value: 'large',
      },
      {
        label: '小',
        value: 'small',
      },
    ],
    isButton: true,
  },
  'label-position': {
    component: 'CommonRadio',
    options: [
      {
        label: '左侧',
        value: 'left',
      },
      {
        label: '右侧',
        value: 'right',
      },
      {
        label: '上方',
        value: 'top',
      },
    ],
    isButton: true,
  },
}
