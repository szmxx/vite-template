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
  'flex-direction': {
    component: 'CommonSelect',
    options: [
      {
        label: 'row',
        value: 'row',
      },
      {
        label: 'row-reverse',
        value: 'row-reverse',
      },
      {
        label: 'column',
        value: 'column',
      },
      {
        label: 'column-reverse',
        value: 'column-reverse',
      },
    ],
  },
  'flex-wrap': {
    component: 'CommonSelect',
    options: [
      {
        label: 'nowrap',
        value: 'nowrap',
      },
      {
        label: 'wrap',
        value: 'wrap',
      },
      {
        label: 'wrap-reverse',
        value: 'wrap-reverse',
      },
    ],
  },
  'justify-content': {
    component: 'CommonSelect',
    options: [
      {
        label: 'flex-start',
        value: 'flex-start',
      },
      {
        label: 'flex-end',
        value: 'flex-end',
      },
      {
        label: 'center',
        value: 'center',
      },
      {
        label: 'space-between',
        value: 'space-between',
      },
      {
        label: 'space-around',
        value: 'space-around',
      },
    ],
  },
  'align-items': {
    component: 'CommonSelect',
    options: [
      {
        label: 'flex-start',
        value: 'flex-start',
      },
      {
        label: 'flex-end',
        value: 'flex-end',
      },
      {
        label: 'center',
        value: 'center',
      },
      {
        label: 'baseline',
        value: 'baseline',
      },
      {
        label: 'stretch',
        value: 'stretch',
      },
    ],
  },
  'flex-type': {
    component: 'CommonRadio',
    options: [
      {
        label: 'flex',
        value: 'flex',
      },
      {
        label: 'inline-flex',
        value: 'inline-flex',
      },
    ],
    isButton: true,
  },
  'grid-type': {
    component: 'CommonRadio',
    options: [
      {
        label: 'grid',
        value: 'grid',
      },
      {
        label: 'inline-grid',
        value: 'inline-grid',
      },
    ],
    isButton: true,
  },
}
