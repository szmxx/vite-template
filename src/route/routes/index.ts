/*
 * @Author: cola
 * @Date: 2022-07-05 10:18:26
 * @LastEditors: cola
 * @Description:
 */
import LayoutPage from '@/layout'
import { RouteRecordRaw } from 'vue-router'
const files = import.meta.globEager('./*.ts')
const modules: RouteRecordRaw[] = []
for (const [, module] of Object.entries(files)) {
  module.default.component = LayoutPage
  modules.push(module.default)
}
export default modules
