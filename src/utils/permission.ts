/*
 * @Author: cola
 * @Date: 2022-07-25 20:56:00
 * @LastEditors: cola
 * @Description:
 */
import { AsyncRoutes } from "@/route"
import { RouteRecordRaw } from 'vue-router'
import { merge } from "lodash"
import { toRawType } from "."
export function buildPermissionTree(menus: RouteRecordRaw[] = []) {
  const result: RouteRecordRaw[] = []
  const map = flatRoutes(AsyncRoutes)
  recursionMenu(menus, map, result)
  return result
}

function recursion(menus: RouteRecordRaw[], callback: (item: RouteRecordRaw) => unknown){
  menus.forEach(menu => {
    callback(menu)
    if(menu?.children?.length) {
      recursion(menu.children, callback)
    }
  })
}

function recursionMenu(menus: RouteRecordRaw[], map: Record<string, RouteRecordRaw>, result: RouteRecordRaw[]) {
  menus.forEach((menu) => {
    let origin = map[menu.name as string]
    if(origin) {
      const item = mergeMenu(origin, menu)
      result.push(item)
      item.children = []
      // 远程存在孩子节点 或者 本地存在重定向路由
      if(menu?.children?.length || origin.redirect) {
        const routes = filterRedirectRoutes(origin.children as RouteRecordRaw[], origin.redirect)
        recursionMenu(routes.concat(menu.children as RouteRecordRaw[] || []), map, item.children)
      }
    }
  })
}

function filterRedirectRoutes(routes: RouteRecordRaw[], redirect: any) {
  if(!redirect) {
    return []
  }
  let type = toRawType(redirect)
  let res = redirect
  if(type === 'Function') {
    res = redirect()
    type = toRawType(res)
  }
  if(type === 'String'){
    // 取最后一个 path name
    res = {
      path: res.split("/").at(-1)
    }
  }
  return routes.filter(route => {
    return (route.name === res.name) || (route.path === res.path) || (route.path === "/" + res.path)
  })
}

function flatRoutes(routes: RouteRecordRaw[]) {
  const map: Record<string, RouteRecordRaw> = {}
  recursion(routes, (route) => {
    map[route.name as string] = route
  })
  return map
}

function mergeMenu(origin: RouteRecordRaw, target:RouteRecordRaw) : RouteRecordRaw{
  return merge({}, origin, target)
}
