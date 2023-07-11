import { IHasChildren } from './../types'
import useStore from '@/store/lowcode'
import pretty from 'pretty'
const store = useStore()
import handlebars, { compile } from 'handlebars'
import { toRawType } from '@/utils'
import {
  INVALID_VALUE,
  STYLE_KEYS,
  UNIQUE_KEY,
  DirectiveRe,
  HOOKS,
  DYNAMIC_KEYS,
  COMPONENT_PREFIX,
  EVENT_SUFFIX,
  HOOK_NAME,
  EventRe,
  Q_START,
  Q_END,
} from './constants'
import { merge, camelCase, capitalize, cloneDeep } from 'lodash'
import { transformExportComponentTree } from '../utils/util'
handlebars.registerHelper(
  'each-in',
  function (data: Record<string, unknown>, options) {
    return Object.keys(data)
      .map((key) => {
        const value = data[key]
        return options.fn({
          key: key,
          value: value,
        })
      })
      .join(' ')
  }
)
// 按组件容器分，一个容器一个组件思路，最终生成多组件
export default async function sfc() {
  const files: Record<string, string>[] = []
  const componentTree = cloneDeep(store.componentTree)
  transformExportComponentTree(componentTree)
  async function container(
    list: IHasChildren[],
    filename = 'RootPage.vue',
    parent?: IHasChildren
  ) {
    const res = await singleSFC(list, filename, parent)
    for (let i = 0; i < list.length; i++) {
      if (list[i] && list[i]?.children?.length) {
        const name = await container(
          list[i].children as IHasChildren[],
          `${(list[i].component as string) + list[i].id}.vue`,
          list[i]
        )
        res.code = res.code.replace(`<${list[i].id}`, `<${name}`)
        res.code = res.code.replace(`${list[i].id}>`, `${name}>`)
      }
    }
    files.unshift({
      filename: filename,
      code: pretty(res.code, {
        ocd: true,
      }),
    })
    return res.name
  }
  await container(componentTree, undefined, undefined)
  return files
}

async function singleSFC(
  list: IHasChildren[],
  filename: string,
  parent?: IHasChildren
) {
  // 所有组件的配置
  const config = store.config
  const formItemConfig = store.formItemConfig
  let _data = Object.create(null)
  let _methods = Object.create(null)
  let _model = Object.create(null)
  let template = ``
  const root = Object.create(null)
  async function getTemplate(item: IHasChildren, slot = '') {
    try {
      const temp = await import(`../components/${item.component}/template`)
      const template = compile(temp.default || temp, {
        noEscape: true,
      })
      const {
        complexAttrs,
        plainAttrs,
        data,
        methods,
        model,
        events,
        onAttrs,
        plainProps,
        complexProps,
      } = convertConfig(
        config[item.id as string],
        item as Record<string, string>
      )
      if (item?.children?.length && !parent) {
        // 重新赋值
        _methods = merge({}, _methods, events)
        const res = template({
          complexAttrs: merge({}, onAttrs, complexProps),
          plainAttrs: plainProps,
        })
        const tag = res.match(/<(.*)\s/)?.[1] || ''
        return res.replaceAll(tag, item.id as string)
      } else {
        // 重新赋值
        _data = merge({}, _data, data)
        _methods = merge({}, _methods, methods)
        _model = merge({}, _model, model)
        const modelKey = Object.keys(model)
        const res = template({
          complexAttrs: merge({}, complexAttrs, complexProps),
          plainAttrs: merge({}, plainAttrs, plainProps),
          modelValue: 'model.' + modelKey?.[0],
          slot: slot,
        })
        return res
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function getFormItemTemplate(item: IHasChildren, slot = '') {
    try {
      const temp = await import(`./template/FormItem`)
      const template = compile(temp.default || temp, {
        noEscape: true,
      })
      const { complexAttrs, plainAttrs, data } = convertConfig(
        formItemConfig[item.id as string],
        item as Record<string, string>
      )
      // 重新赋值
      _data = merge({}, _data, data)
      const res = template({
        complexAttrs: complexAttrs,
        plainAttrs: plainAttrs,
        slot: slot,
      })
      return res
    } catch (error) {
      console.error(error)
    }
  }

  function getScript() {
    const imports: string[] = []
    root.name = filename.replace(/\.vue$/, '')

    root.data = () => {
      return {
        model: _model,
        ..._data,
      }
    }
    const components = list.reduce((acc, cur) => {
      if (cur?.children?.length) {
        const { id, component } = cur as Record<string, string>
        acc[component + id] = magicQuot(component + id)
        imports.push(
          `import ${component + id} from './${
            root.name === 'RootPage' ? 'components/' : ''
          }${component + id}.vue'`
        )
      }
      return acc
    }, {})
    root.components = components
    root.methods = _methods
    let rootStr = stringify(root)
    const s_RegExp = new RegExp(`['|"]${Q_START}`, 'g')
    const e_RegExp = new RegExp(`${Q_END}['|"]`, 'g')
    rootStr = rootStr.replaceAll('\\"', "'")
    rootStr = rootStr.replace(s_RegExp, '')
    rootStr = rootStr.replace(e_RegExp, '')
    rootStr = rootStr.replace(/['|"](\w+)['|"]:/g, '$1:')
    rootStr = rootStr.replace(/:\s*function\s*\w*/g, '')
    const script = `
    <script>
      ${imports.join('\n')}
      export default ${rootStr}
    </script>
    `
    return script
  }

  for await (const item of list) {
    let _template = await getTemplate(item)
    if (formItemConfig[item.id as string]) {
      _template = await getFormItemTemplate(item, _template)
    }
    template += _template
  }
  if (parent) {
    template = (await getTemplate(parent, template)) as string
  }
  template = `
    <template>
      ${template}
    </template>
  `
  const script = getScript()
  return {
    name: root.name,
    code: template + '\n' + script,
  }
}

export function convertConfig(
  config: Record<string, unknown>,
  item: Record<string, string>
) {
  const { id, component } = item
  const formItemConfig = store.formItemConfig
  const prefix = component.replace(COMPONENT_PREFIX, '')
  // 组件事件
  const events = Object.create(null)
  // 组件绑定事件
  const onAttrs = Object.create(null)
  // 组件传入普通数据
  const plainProps = Object.create(null)
  // 组件传入复杂数据
  const complexProps = Object.create(null)
  // 组件方法
  const methods = Object.create(null)
  // 组件数据
  const data = Object.create(null)
  // 组件的基本类型配置
  const plainAttrs = Object.create(null)
  // 组件的复杂类型配置
  const complexAttrs = Object.create(null)
  // 组件的钩子
  const hooks = Object.create(null)
  // model
  const model = Object.create(null)
  if (formItemConfig[id]) {
    model[formItemConfig[id].prop as string] = store.model[item.id as string]
  }
  Object.keys(config).forEach((key) => {
    const value = config[key]
    // model
    if (key === UNIQUE_KEY) {
      model[camelCase(value as string)] = store.model[item.id as string]
      return
    }
    // 指令
    if (DirectiveRe.test(key)) {
      plainAttrs[key] = value
      return
    }
    const type = toRawType(value)
    switch (type) {
      case 'Number':
      case 'String':
      case 'Boolean':
        // 排除空值和无效值
        if (!INVALID_VALUE.includes(value as string)) {
          if (STYLE_KEYS.includes(key)) {
            plainAttrs[key] = value
          } else {
            plainAttrs[key] = value
          }
        }
        break
      case 'Object':
      case 'Array':
        // 排除无值情况
        if (value && Object.keys(value).length) {
          const _key = magicKey(prefix, key, id)
          if (STYLE_KEYS.includes(key)) {
            complexAttrs[key] = _key
          } else {
            complexAttrs[key] = _key
          }
          data[_key] = value
        }
        break
      case 'Function':
        if (!isEmptyFunction(value as () => unknown)) {
          // 钩子函数
          if (HOOKS.includes(key)) {
            hooks[key] = value
          } else {
            const _key = magicKey(prefix, key, EVENT_SUFFIX + id)
            // 动态获取数据的key
            if (DYNAMIC_KEYS.includes(key)) {
              complexAttrs[key] = _key
            } else {
              if (EventRe.test(key)) {
                onAttrs[key] = _key
                events[_key] = value
              }
              complexAttrs[key] = _key
            }
            methods[_key] = value
          }
        }

        break
    }
  })
  // 存在 hooks
  if (Object.keys(hooks)?.length) {
    const _key = magicKey(prefix, HOOK_NAME, id)
    data[_key] = hooks
    complexAttrs[HOOK_NAME] = _key
  }
  return {
    data: data,
    methods: methods,
    complexAttrs: complexAttrs,
    plainAttrs: plainAttrs,
    model: model,
    events: events,
    plainProps: plainProps,
    complexProps: complexProps,
    onAttrs: onAttrs,
  }
}

function magicKey(prefix: string, key: string, id: string): string {
  return camelCase(prefix + capitalize(key) + capitalize(id)) as string
}

function magicQuot(value: string) {
  return Q_START + value + Q_END
}

function stringify(data: Record<string, unknown>) {
  return JSON.stringify(
    data,
    (key, value) => {
      if (key === 'data' && typeof value === 'function') {
        const returnVal = value()
        return magicQuot(mockFun(returnVal).replaceAll('\n', ''))
      }
      if (typeof value === 'function') {
        return magicQuot(value.toString().replaceAll('\n', ''))
      }
      return value
    },
    2
  )
}

function mockFun(value: Record<string, unknown>): string {
  return `
    function () {
      return ${stringify(value)}
    }
  `
}
function isEmptyFunction(func: () => unknown): boolean {
  let str = func.toString().replace(/\s+/g, '')
  str = str.match(/{.*}/g)?.[0] as string
  return str === '{}'
}
