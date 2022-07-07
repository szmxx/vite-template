/*
 * @Author: cola
 * @Date: 2022-07-05 17:42:32
 * @LastEditors: cola
 * @Description:
 */
import { originGet, AxiosConfig } from './index'
interface AppConfig {
  title: string
  development?: AxiosConfig
  production?: AxiosConfig
  [key: string]: unknown | AxiosConfig
}
export interface TodoItem {
  name: string
  task: string
}
export function getAppConfig() {
  return originGet<AppConfig>('static/appConfig.json')
}

export function getTodoList() {
  return originGet<TodoItem[]>('static/todoList.json')
}
