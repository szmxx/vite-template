/*
 * @Author: cola
 * @Date: 2022-07-07 12:53:04
 * @LastEditors: cola
 * @Description:
 */
import { defineConfig } from 'vitest/config'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import DefineOptions from 'unplugin-vue-define-options/vite'

export default defineConfig({
  define: {
    'import.meta.vitest': 'undefined',
  },
  plugins: [Vue(), VueJsx(), DefineOptions()],
  optimizeDeps: {
    disabled: true,
  },
  test: {
    globals: true,
    clearMocks: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    includeSource: ['src/**/*.{js,ts}'],
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  },
})
