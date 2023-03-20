/*
 * @Author: cola
 * @Date: 2023-03-20 10:56:52
 * @LastEditors: cola
 * @Description:
 */
export interface IComponentPanelItemChild {
  id?: string
  title?: string
  component?: string
  icon?: string
}
export interface IComponentPanelItem {
  title: string
  name: string
  list: IComponentPanelItemChild[]
}
