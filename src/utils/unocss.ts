/*
 * @Author: cola
 * @Date: 2022-07-23 00:12:48
 * @LastEditors: cola
 * @Description:
 */
import type { Theme } from '@unocss/preset-uno'

const namespace = 'v'

export function ns(name: string, type = '') {
  if (type !== '') {
    type = '-' + type + (name ? '-' : '')
  }
  return `var(--${namespace}${type}${name})`
}

export function getBaseRule(theme: Theme, group: string, key: string) {
  const types = group.split(',') as (keyof Theme)[]
  let res: unknown = (theme?.colors?.[types[0]] as Record<string, string>)?.[
    key
  ]
  if (!res) {
    res = (theme[types[0]] as Record<string, string>)?.[key]
  }
  if (!res && types.length > 1) {
    res = getBaseRule(theme, group.slice(types[0].length + 1), key)
  }
  return res as string
}
export function getDirection(d: string, space: any) {
  let t = 0,
    r = 0,
    b = 0,
    l = 0
  switch (d) {
    case 't':
      t = space
      break
    case 'r':
      r = space
      break
    case 'b':
      b = space
      break
    case 'l':
      l = space
      break
    case 'y':
      t = b = space
      break
    case 'x':
      r = l = space
      break
    default:
      t = r = b = l = space
      break
  }
  return {
    t,
    r,
    b,
    l,
  }
}

export function generateTypeColor() {
  const types = ['primary', 'success', 'warning', 'error', 'info']
  const colors = types.reduce((acc: Record<string, unknown>, type) => {
    acc[type] = {
      DEFAULT: ns(type, 'color'),
      light: {
        3: ns(`${type}-light-3`, 'color'),
        5: ns(`${type}-light-5`, 'color'),
        7: ns(`${type}-light-7`, 'color'),
        9: ns(`${type}-light-9`, 'color'),
      },
    }
    return acc
  }, {})
  return colors
}
