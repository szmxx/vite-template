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
import Inspect from 'vite-plugin-inspect'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'
// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.JPG'],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use '@/style/variables.scss' as *;`,
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
      dirs: ['src/components', 'main.ts'],
      extensions: ['vue'],
      deep: true,
      dts: true,
      resolvers: [
        ElementPlusResolver(),
        IconsResolver({
          alias: {
            park: 'icon-park',
          },
          customCollections: ['custom'],
        }),
      ],
    }),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ['vue', 'vue-router', '@vueuse/core', 'pinia', 'vitest'],
      include: [/\.[tj]sx?$/, /\.vue$/, /\.vue\?vue/, /\.md$/],
      dirs: ['./src/composables'],
      eslintrc: {
        enabled: false,
        globalsPropValue: true,
      },
    }),
    Unocss(),
    Icons({
      autoInstall: true,
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader('./src/icon/svg', (svg) =>
          svg
            .replace(/(width|height)=['"](\w+)['"]/g, '')
            .replace(/^<svg /, '<svg fill="currentColor"')
        ),
      },
      iconCustomizer(collection, icon, props) {
        props.width = '1.2em'
        props.height = '1.2em'
      },
    }),
    Inspect(),
  ],
  optimizeDeps: {
    include: [
      `monaco-editor/esm/vs/language/json/json.worker`,
      `monaco-editor/esm/vs/language/css/css.worker`,
      `monaco-editor/esm/vs/language/html/html.worker`,
      `monaco-editor/esm/vs/language/typescript/ts.worker`,
      `monaco-editor/esm/vs/editor/editor.worker`,
    ],
  },
})
