/*
 * @Author: cola
 * @Date: 2022-11-01 15:13:28
 * @LastEditors: cola
 * @Description:
 */
import { InjectionKey, Ref } from 'vue'
import { FormConfig } from '../types'
export const FormModelKey: InjectionKey<Ref<Record<string, unknown>>> =
  Symbol('FormModel')

export const FormConfigKey: InjectionKey<FormConfig> = Symbol('FormConfig')

export const FormComponentKey: InjectionKey<Ref<Record<string, unknown>>> =
  Symbol('FormComponent')
