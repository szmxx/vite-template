/*
 * @Author: cola
 * @Date: 2023-03-27 00:50:36
 * @LastEditors: cola
 * @Description:
 */
import useStore from '@/store/lowcode'
const store = useStore()
import handlebars, { compile } from 'handlebars'
import { toRawType } from '@/utils'
import { recursion } from '../utils/util'
import { INVALID_VALUE } from './constants'
// 静态片段
handlebars.registerPartial('static-bind', '{{key}}={{value}}')
// 动态绑定
handlebars.registerPartial('dynamic-bind', ':{{key}}={{value}}')

handlebars.registerHelper('each-in', function (data: Record<string, unknown>) {
  return Object.keys(data)
    .map((key) => {
      const value = data[key]
      const type = toRawType(value)
      switch (type) {
        case 'Number':
        case 'String':
        case 'Boolean':
          if (!INVALID_VALUE.includes(value as string)) {
            return `
                ${key}="${value}"
              `
          }
          break
        case 'Object':
        case 'Array':
          if (value && Object.keys(value)) {
            return `
                :${key}="${key}"
              `
          }
          break
        case 'Function':
          return `
                :${key}="${key}"
              `
      }
      return ''
    })
    .join(' ')
})

export function compileTemplate() {
  const componentTree = store.componentTree
  const config = store.config
  let result = `<template>`
  recursion(componentTree, async (item) => {
    try {
      const temp = await import(`../components/${item.component}/template`)
      const template = compile(temp.default || temp)
      const res = template({ attrs: config[item.id as string] })
      result += res
    } catch (error) {
      console.error(error)
    }
  })
  result += '</template>'
  return result
}

export function convertConfig(config: Record<string, unknown>) {
  const attrs = Object.create(null)
  const style = Object.create(null)
  const event = Object.create(null)
  const directive = Object.create(null)

  Object.keys(config).forEach((key) => {
    const value = config[key]
  })
}
