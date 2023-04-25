/*
 * @Author: cola
 * @Date: 2022-07-06 10:20:56
 * @LastEditors: cola
 * @Description:
 */
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'
import { FileSystemIconLoader } from '@iconify/utils/lib/loader/node-loaders'
import { presetScrollbar } from 'unocss-preset-scrollbar'

import theme from './theme'
import { getBaseRule, getDirection } from './src/utils/unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      scale: 1.2,
      collections: {
        carbon: () =>
          import('@iconify-json/carbon').then((i) => i.icons as any),
        mdi: () => import('@iconify-json/mdi').then((i) => i.icons as any),
        iconoir: () => import('@iconify-json/iconoir').then((i) => i.icons as any),
        custom: FileSystemIconLoader('./src/icon/svg', (svg) => {
          svg.replace(/(width|height)=['"](\w+)['"]/g, '')
          if ((svg?.match(/fill=/g)?.length || 0) <= 1) {
            return svg.replace(/^<svg /, '<svg fill="currentColor" ')
          }
          return svg
        }),
      },
    }),
    presetScrollbar({
      scrollbarWidth: '6px',
      scrollbarHeight: '6px',
      scrollbarThumbColor: '#ddd',
      varPrefix: 'uno',
      scrollbarTrackRadius: '4px',
      scrollbarThumbRadius: '4px',
    }),
  ],
  theme: theme,
  shortcuts: [
    {
      center: 'flex justify-center items-center',
      'i-center': 'inline-flex justify-center items-center',
      fy: 'flex items-center',
      'i-fy': 'inline-flex items-center',
      fx: 'flex justify-center',
      'i-fx': 'inline-flex justify-center',
      'text-ellipsis': 'text-ellipsis whitespace-nowrap overflow-hidden',
    },
  ],
  rules: [
    [
      /^text-(.*)$/,
      ([, c], { theme }) => {
        const res = getBaseRule(theme, 'textColor,fontSize,fontWeight', c)
        if (res) {
          if (res?.includes?.('color')) {
            return {
              color: res,
            }
          } else {
            if (res?.includes?.('weight')) {
              return {
                'font-weight': res,
              }
            } else {
              return {
                'font-size': res,
              }
            }
          }
        }
      },
    ],
    [
      /^bg-(.*)$/,
      ([, c], { theme }) => {
        let color = ''
        if (/^fill-(.*)/.test(c)) {
          color = getBaseRule(theme, 'fillColor', c.replace('fill-', ''))
        } else {
          color = getBaseRule(theme, 'bgColor,fillColor', c)
        }
        if (color) {
          return {
            background: color,
          }
        }
      },
    ],
    [
      /^(?:border|b)-(.*)$/,
      ([, c], { theme }) => {
        const res = getBaseRule(theme, 'borderColor,borderWidth', c)
        if (res) {
          if (res?.includes?.('color')) {
            return {
              'border-color': res,
            }
          } else {
            return {
              'border-width': res,
            }
          }
        }
      },
    ],
    [
      /^r(.)?-(.*)$/,
      ([, d, c], { theme }) => {
        const radius = getBaseRule(theme, 'borderRadius', c)
        const { t, l, b, r } = getDirection(d, radius)
        if (radius) {
          return {
            'border-radius': `${t} ${r} ${b} ${l}`,
          }
        }
      },
    ],
    [
      /^box-shadow-(.*)$/,
      ([, c], { theme }) => {
        const shadow = getBaseRule(theme, 'boxShadow', c)
        if (shadow) {
          return {
            'box-shadow': shadow,
          }
        }
      },
    ],
    [
      /^p(.)?-(.*)$/,
      ([, d, c], { theme }) => {
        const space = getBaseRule(theme, 'space', c)
        const { t, l, b, r } = getDirection(d, space)
        if (space) {
          return {
            padding: `${t} ${r} ${b} ${l}`,
          }
        }
      },
    ],
    [
      /^m(.)?-(.*)$/,
      ([, d, c], { theme }) => {
        const space = getBaseRule(theme, 'space', c)
        const { t, l, b, r } = getDirection(d, space)
        if (space) {
          return {
            margin: `${t} ${r} ${b} ${l}`,
          }
        }
      },
    ],
    [
      /^lh-(.*)$/,
      ([, c], { theme }) => {
        const res = getBaseRule(theme, 'lineHeight', c)
        if (res) {
          return {
            'line-height': res,
          }
        }
      },
    ],
    [
      /^z-(.*)$/,
      ([, c], { theme }) => {
        const res = getBaseRule(theme, 'zIndex', c)
        if (res) {
          return {
            'z-index': res,
          }
        }
      },
    ],
  ],
  include: [`${__dirname}/**/*`],
  exclude: [`${__dirname}/node_modules/**/*`],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
