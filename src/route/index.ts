/*
 * @Author: cola
 * @Date: 2022-07-04 19:10:01
 * @LastEditors: cola
 * @Description:
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomePage from '@/views/home'
import ErrorPage from '@/views/error'
import routes from './routes'
import { App } from 'vue'
const ConstantRoutes: RouteRecordRaw[] = [
  {
    name: 'Home',
    path: '/',
    component: HomePage,
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/404',
    name: 'NotFound',
  },
  {
    path: '/404',
    name: 'NotExist',
    component: ErrorPage,
  },
  ...routes,
]
export function install(app?: App) {
  const router = createRouter({
    history: createWebHashHistory(),
    routes: ConstantRoutes,
  })
  if (app) {
    app.use(router)
  }
  return router
}
