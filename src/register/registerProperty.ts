import Http from '@/utils/Http'
import { App } from 'vue'
import { message, notification } from 'ant-design-vue'

export default (app: App) => {
  app.config.globalProperties.$http = Http
  app.config.globalProperties.$message = message
  app.config.globalProperties.$notice = notification
}
