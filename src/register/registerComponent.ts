/*
 * @Author: cola
 * @Date: 2022-07-19 10:34:58
 * @LastEditors: cola
 * @Description
 */
import { App } from 'vue'
import install from '@/components'
import Layout from 'vue-grid-layout'
export default (app: App) => {
  install(app)
  app.use(Layout)
}
