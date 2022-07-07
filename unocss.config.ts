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
} from 'unocss'
import { presetScrollbar } from 'unocss-preset-scrollbar'
export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons(),
    presetScrollbar({
      scrollbarWidth: '6px',
      scrollbarHeight: '6px',
      scrollbarThumbColor: '#ddd',
      varPrefix: 'uno',
      scrollbarTrackRadius: '4px',
      scrollbarThumbRadius: '4px',
    }),
  ],
  include: [`${__dirname}/**/*`],
  exclude: [`${__dirname}/node_modules/**/*`],
  theme: {
    colors: {
      primary: {
        DEFAULT: '#2563eb',
        deep: '#1d4ed8',
      },
    },
  },
  rules: [],
  shortcuts: {},
  transformers: [transformerDirectives()],
})
