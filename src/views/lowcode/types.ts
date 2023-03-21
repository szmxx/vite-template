/*
 * @Author: cola
 * @Date: 2023-03-20 10:56:52
 * @LastEditors: cola
 * @Description:
 */
export interface IComponentPanelItemChild {
  title: string
  component: string
  icon: string
  [key: string]: string | number | boolean
}
export interface IComponentPanelItem {
  title: string
  name: string
  list: IComponentPanelItemChild[]
}
