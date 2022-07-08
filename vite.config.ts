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
import AutoImport from 'unplugin-auto-import/vite'
import { VantResolver } from 'unplugin-vue-components/resolvers'
import { createStyleImportPlugin, VantResolve } from 'vite-plugin-style-import'
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
      resolvers: [VantResolver()],
      dirs: ['src/components'],
      extensions: ['vue'],
      deep: true,
      dts: true,
    }),
    AutoImport({
      resolvers: [VantResolver()],
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia', 'vitest'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: [],
      eslintrc: {
        enabled: false,
        globalsPropValue: true,
      },
    }),
    createStyleImportPlugin({
      resolves: [VantResolve()],
      // vant 配置应该有问题，esModule 本来应该为 true 的
      libs: [
        {
          libraryName: 'vant',
          esModule: false,
          resolveStyle: (name) => {
            return `vant/es/${name}/style`
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
