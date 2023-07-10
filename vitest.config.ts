/*
 * @Author: cola
 * @Date: 2022-07-07 12:53:04
 * @LastEditors: cola
 * @Description:
 */
import { defineConfig } from 'vitest/config'
import { mergeConfig } from 'vite'
import viteConfig from './vite.config'
export default mergeConfig(
  viteConfig,
  defineConfig({
    define: {
      'import.meta.vitest': 'undefined',
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
)
