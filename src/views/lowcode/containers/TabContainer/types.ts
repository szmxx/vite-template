/*
 * @Author: cola
 * @Date: 2023-04-28 11:53:37
 * @LastEditors: cola
 * @Description:
 */
import { IComponentPanelItemChild } from '../../types'
export interface TabItem {
  label: string
  name: string
  disabled?: boolean
  closable?: boolean
  lazy?: boolean
  children?: IComponentPanelItemChild[]
}
