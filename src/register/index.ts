/*
 * @Author: cola
 * @Date: 2022-07-05 10:22:47
 * @LastEditors: cola
 * @Description:
 */
import { App } from 'vue'
import { install as installRouter } from '@/route'
import { install as installStore } from '@/store'
import installComponent from './registerComponent'
import installProperty from './registerProperty'
import i18n from '@/locales'
export default (app: App) => {
  app.use(i18n)
  installRouter(app)
  installStore(app)
  installComponent(app)
  installProperty(app)
}
