/*
 * @Author: cola
 * @Date: 2023-03-30 00:36:13
 * @LastEditors: cola
 * @Description:
 */
import { InjectionKey, ComponentInternalInstance } from 'vue'
export const InstanceKey: InjectionKey<ComponentInternalInstance> =
  Symbol('InstanceKey')
