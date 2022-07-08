/*
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
 */
/// <reference types="vite/client" />
import { message, notification } from 'ant-design-vue'
import Http from '@/utils/Http'
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $http: typeof Http
    $message: typeof message
    $notice: typeof notification
  }
}
