/*
 * @Author: cola
 * @Date: 2022-07-08 14:40:58
 * @LastEditors: cola
 * @Description:
 */
import Http from '@/utils/Http'
import { App } from 'vue'
export default (app: App) => {
  app.config.globalProperties.$http = Http
  app.config.globalProperties.$toast = VanToast
  app.config.globalProperties.$notify = VanNotify
  app.config.globalProperties.$dialog = VanDialog
}
