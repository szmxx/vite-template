/*
 * @Author: cola
 * @Date: 2023-03-21 18:35:06
 * @LastEditors: cola
 * @Description:
 */

import useStore from '@/store/lowcode'
const store = useStore()

export function useModel() {
  return computed(() => {
    return store._model
  })
}
export function useConfig() {
  return computed(() => {
    return store.config
  })
}
