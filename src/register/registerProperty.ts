import Http from '@/utils/Http'
import { App } from 'vue'

export default (app: App) => {
  app.config.globalProperties.$http = Http
}
