/*
 * @Author: cola
 * @Date: 2022-07-23 03:36:19
 * @LastEditors: cola
 * @Description:
 */
import type { TreeItem } from '@/components/GlobalTree/types'
import { RouteRecordRaw } from 'vue-router'
import { originGet, AxiosConfig } from './index'
export interface AppConfig {
  title: string
  development?: AxiosConfig
  production?: AxiosConfig
  [key: string]: unknown | AxiosConfig
}
export interface TodoItem {
  name: string
  task: string
}

export interface PermissionTree {
  menus: RouteRecordRaw[]
}

export function getAppConfig() {
  return originGet<AppConfig>('/static/appConfig.json')
}

export function getTodoList() {
  return originGet<TodoItem[]>('/static/todoList.json')
}

export function getMenuList() {
  return originGet<TreeItem[]>('/static/menuList.json')
}

export function getPermissionTree() {
  return originGet<PermissionTree>('/static/menuConfig.json')
}
