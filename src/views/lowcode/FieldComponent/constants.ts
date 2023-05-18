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
  type: '类型',
  'label-position': '字段位置',
  'label-width': '字段宽度',
  'label-suffix': '字段后缀',
  'hide-required-asterisk': '隐藏星号',
  'require-asterisk-position': '星号位置',
  'inline-message': '行内形式展示校验信息',
  'show-message': '显示校验错误信息',
  disabled: '禁用',
  rules: '规则',
  'scroll-to-error': '滚动至报错',
  required: '必须',
  error: '错误信息',
  inline: '行内表单模式',
  style: '样式',
  class: '类名',
  label: '文本',
  readonly: '只读',
  'show-password': '显示密码',
  clearable: '清除',
  placeholder: '占位符',
  'show-word-limit': '显示字数限制',
  rows: '行数',
  autofocus: '自动聚焦',
  options: '数据',
  checked: '选中',
  indeterminate: '半选',
  min: '最小',
  max: '最大',
  step: '步数',
  controls: '控制器',
  'controls-position': '控制器位置',
  'grid-type': '栅格类型',
  'flex-type': 'Flex类型',
  'row-gap': '行间距',
  'column-gap': '列间距',
  'flex-wrap': '换行模式',
  'flex-direction': '方向',
  'justify-content': '水平对齐',
  'align-items': '居中对齐',
  'row-count': '每行个数',
  'page-size': '每页数量',
  'pager-count': '页数',
  total: '总页数',
  background: '背景',
  placement: '位置',
  trigger: '触发方式',
  'hide-on-click': '点击即隐藏',
  multiple: '多选',
  'collapse-tags': '折叠显示',
  'allow-half': '半选',
  'show-alpha': '显示透明度',
  'popper-class': '超类',
  'show-input': '显示输入框',
  'show-input-controls': '输入框控制器',
  'border-style': '边框样式',
  direction: '方向',
  truncated: '截断',
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
  type: {
    component: 'CommonSelect',
    options: [
      {
        label: '默认',
        value: '',
      },
      {
        label: '主色',
        value: 'primary',
      },
      {
        label: '成功',
        value: 'success',
      },
      {
        label: '信息',
        value: 'info',
      },
      {
        label: '警告',
        value: 'warning',
      },
      {
        label: '危险',
        value: 'danger',
      },
    ],
  },
  placement: {
    component: 'CommonSelect',
    options: [
      {
        label: 'top',
        value: 'top',
      },
      {
        label: 'top-start',
        value: 'top-start',
      },
      {
        label: 'top-end',
        value: 'top-end',
      },
      {
        label: 'bottom',
        value: 'bottom',
      },
      {
        label: 'bottom-start',
        value: 'bottom-start',
      },
      {
        label: 'bottom-end',
        value: 'bottom-end',
      },
      {
        label: 'left',
        value: 'left',
      },
      {
        label: 'left-start',
        value: 'left-start',
      },
      {
        label: 'left-end',
        value: 'left-end',
      },
      {
        label: 'right',
        value: 'right',
      },
      {
        label: 'right-start',
        value: 'right-start',
      },
      {
        label: 'right-end',
        value: 'right-end',
      },
    ],
  },
  trigger: {
    component: 'CommonRadio',
    options: [
      {
        label: 'hover',
        value: 'hover',
      },
      {
        label: 'click',
        value: 'click',
      },
      {
        label: 'contextmenu',
        value: 'contextmenu',
      },
    ],
    isButton: true,
  },
  'border-style': {
    component: 'CommonSelect',
    options: [
      {
        label: 'hidden',
        value: 'hidden',
      },
      {
        label: 'solid',
        value: 'solid',
      },
      {
        label: 'dotted',
        value: 'dotted',
      },
      {
        label: 'dashed',
        value: 'dashed',
      },
    ],
  },
  'require-asterisk-position': {
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
    ],
    isButton: true,
  },
  direction: {
    component: 'CommonRadio',
    options: [
      {
        label: '水平',
        value: 'horizontal',
      },
      {
        label: '垂直',
        value: 'vertical',
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
