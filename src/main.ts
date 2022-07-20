/*
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
 */
import { createApp } from 'vue'
import App from './App.vue'
import '@/icon/iconfont/iconfont.css'
import 'uno.css'
import install from '@/register'
import initConfig from './config'
import '@/style/index.scss'
useTheme('default')
const app = createApp(App)
install(app)
;(async () => {
  await initConfig()
  app.mount('#app')
})()
