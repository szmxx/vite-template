import { FormItem } from './../types/index'
import { toRawType } from '@/utils'

export const COMPONENT_FIELD_MAP: Record<string, Record<string, unknown>> = {
  'global-input-number': {
    min: Infinity,
    max: Infinity,
    step: 1,
    readonly: false,
    disabled: false,
    placeholder: '',
    controls: true,
    'step-strictly': false,
  },
  'global-input': {
    type: ['text', 'textarea'],
    placeholder: '',
    clearable: false,
    'show-password': false,
    disabled: false,
    'prefix-icon': '',
    'suffix-icon': '',
    readonly: false,
    resize: ['none', 'both', 'horizontal', 'vertical'],
  },
  'global-switch': {
    disabled: false,
    'active-icon': '',
    'inactive-icon': '',
    'active-text': '',
    'inactive-text': '',
    'active-color': '',
    'inactive-color': '',
    'border-color': '',
  },
  'global-select': {
    multiple: false,
    disabled: false,
    clearable: false,
    'collapse-tags': false,
    'collapse-tags-tooltip': false,
    placeholder: '',
    filterable: false,
    'suffix-icon': '',
    teleported: true,
    placement: [
      'top',
      'top-start',
      'top-end',
      'bottom',
      'bottom-start',
      'bottom-end',
      'left',
      'left-start',
      'left-end',
      'right',
      'right-start',
      'right-end',
    ],
  },
}
export const DEFAULT_FIELD_CONFIG: Record<string, string> = {
  labelWidth: '标签宽度',
  labelPosition: '标签位置',
  size: '表单大小',
  panelWidth: '面板宽度',
  disabled: '禁用表单',
  min: '最小数字',
  max: '最大数字',
}
export const DEFAULT_FORM_CONFIG: Record<string, unknown> = {
  labelWidth: '60px',
  labelPosition: 'right',
  disabled: false,
  panelWidth: '400px',
  size: 'default',
  min: 0,
  max: 100,
}
export const COMPONENT_MAP: Record<string, string> = {
  Number: 'global-input-number',
  String: 'global-input',
  Boolean: 'global-switch',
  Object: 'visual-form-group',
  Array: 'global-select',
  Undefined: 'global-input',
  Null: 'global-input',
}

export const DEFAULT_MODEL: Record<string, unknown> = {
  Number: 0,
  String: '',
  Boolean: false,
  Object: '',
  Array: '',
  Undefined: '',
  Null: '',
}

export function transform(
  target: Record<string, unknown>,
  fieldMap: Record<string, string>,
  options = { prefixKey: '', level: 0 }
): FormItem[] {
  const res: FormItem[] = []
  const keys: string[] = Object.keys(target)
  let value
  let component
  let key
  let list: unknown[] = []
  for (let i = 0; i < keys.length; i++) {
    value = target[keys[i]]
    component = toRawType(value)
    if (component === 'Object') {
      value = transform(value as Record<string, unknown>, fieldMap, {
        prefixKey: keys[i],
        level: options.level++,
      })
    }
    if (component === 'Array') {
      list = (value as string[]).map((i: string) => {
        return {
          label: i,
          value: i,
        }
      })
      value = void 0
    }
    key = options.prefixKey ? options.prefixKey + '_' + keys[i] : keys[i]
    res.push({
      parentKey: options.prefixKey,
      key: key,
      label: fieldMap[key] || key,
      value: value,
      component: COMPONENT_MAP[component],
      type: component === 'Object' ? 'group' : '',
      options: list,
      default: DEFAULT_MODEL[component],
      level: options.level,
    })
  }
  return res
}

export function parseModel(list: FormItem[], model: Record<string, unknown>) {
  list.map((item) => {
    if (item.type !== 'group') {
      model[item.key] = item.value
    } else {
      parseModel(item.value as FormItem[], model)
    }
  })
}

export function getComponentConfig(
  list: FormItem[],
  config: Record<string, Record<string, unknown>>
) {
  list.map((item) => {
    if (item.type !== 'group') {
      config[item.key] = COMPONENT_FIELD_MAP[item.component]
    } else {
      getComponentConfig(item.value as FormItem[], config)
    }
  })
  return config
}

export function getDefaultModel(
  list: FormItem[],
  model: Record<string, unknown>
) {
  list.map((item) => {
    if (item.type !== 'group') {
      model[item.key] = item.default
    } else {
      getDefaultModel(item.value as FormItem[], model)
    }
  })
  return model
}

export function getDefaultField(
  list: FormItem[],
  model: Record<string, string>
) {
  list.map((item) => {
    if (item.type !== 'group') {
      model[item.key] = ''
    } else {
      getDefaultField(item.value as FormItem[], model)
    }
  })
  return model
}
/**
 * @Author: cola
 * @param {*} local
 * @param {*} remote
 * @return {*}
 * @description: 合并 local 和 remote 有值 key 值，remote 没有值，则取 local 的值
 */
export function mergeField(
  local: Record<string, unknown>,
  remote: Record<string, unknown>
) {
  local = local ?? {}
  remote = remote ?? {}
  const localKeys: string[] = Object.keys(local)
  const remoteKeys: string[] = Object.keys(remote)
  const model: Record<string, unknown> = {}
  remoteKeys.map((key: string) => {
    if (remote[key]) {
      model[key] = remote[key]
    } else {
      if (local[key]) {
        model[key] = local[key]
      }
    }
  })
  localKeys.map((key: string) => {
    if (!model[key]) {
      model[key] = local[key]
    }
  })
  return model
}
/**
 * @Author: cola
 * @param {*} local
 * @param {*} remote
 * @return {*}
 * @description:
 */
// export function diffField(local, remote) {}
