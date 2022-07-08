/*
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
 */
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import DefineOptions from 'unplugin-vue-define-options/vite'
import Unocss from 'unocss/vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import Inspect from 'vite-plugin-inspect'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import AutoImport from 'unplugin-auto-import/vite'
import {
  createStyleImportPlugin,
  AndDesignVueResolve,
} from 'vite-plugin-style-import'
import { readFileSync } from 'fs'
import LessToJS from 'less-vars-to-js'
const themeVariables = LessToJS(
  readFileSync(resolve(__dirname, 'src/theme/theme.less'), 'utf8')
)
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import '@/style/variables.scss';`,
      },
      // 必须设置，不然报错
      less: {
        javascriptEnabled: true,
        modifyVars: themeVariables,
      },
    },
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  plugins: [
    vue(),
    VueJsx(),
    DefineOptions(),
    Components({
      // 如果需要改变主题，导入需是less
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: true,
    }),
    AutoImport({
      // 如果需要改变主题，导入需是less
      resolvers: [AntDesignVueResolver({ importStyle: 'less' })],
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia', 'vitest'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: [],
      eslintrc: {
        enabled: false,
        globalsPropValue: true,
      },
    }),
    createStyleImportPlugin({
      resolves: [AndDesignVueResolve()],
      libs: [
        {
          libraryName: 'ant-design-vue',
          esModule: true,
          resolveStyle: (name) => {
            return `ant-design-vue/es/${name}/style/index`
          },
        },
      ],
    }),
    Unocss(),
    createSvgIconsPlugin({
      iconDirs: [resolve(process.cwd(), 'src/svg')],
      symbolId: 'icon-[name]',
      customDomId: '__svg__icons__dom__',
    }),
    Inspect(),
  ],
})
