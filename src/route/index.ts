/*
 * @Author: cola
 * @Date: 2022-07-04 19:10:01
 * @LastEditors: cola
 * @Description:
 */
import { createRouter, RouteRecordRaw, createWebHistory } from 'vue-router'
import HomePage from '@/views/home'
import LoginPage from '@/views/login'
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
    name: 'Login',
    path: '/login',
    component: LoginPage,
    alias: '/aaa',
  },
  {
    path: '/404',
    name: 'NotExist',
    component: ErrorPage,
  },
  ...routes,
]
const router = createRouter({
  history: createWebHistory(),
  routes: ConstantRoutes,
})

export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route
    if (name) {
      router.hasRoute(name) && router.removeRoute(name)
    }
  })
}

export function install(app?: App) {
  if (app) {
    app.use(router)
  }
}

export default router
