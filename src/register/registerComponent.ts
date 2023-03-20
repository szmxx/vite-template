/*
 * @Author: cola
 * @Date: 2022-07-19 10:34:58
 * @LastEditors: cola
 * @Description
 */
import { App } from 'vue'
import install from '@/components'
import installLowcodeComponent from '@/views/lowcode/components'
import installLowcodeContainer from '@/views/lowcode/containers'
import Layout from 'vue-grid-layout'
export default (app: App) => {
  install(app)
  installLowcodeComponent(app)
  installLowcodeContainer(app)
  app.use(Layout)
}
