/*
 * @Author: cola
 * @Date: 2022-07-05 14:40:02
 * @LastEditors: cola
 * @Description:
 */
import { defineStore } from 'pinia'
// 更新数据方式
/*
1、直接更新
store.counter++
2、批量更新
store.$patch({
  counter: 2
})
3、批量更新
store.$patch((state)=>{
  state.counter++
})
4、action
store.increment()
5、替换整体
store.$state = {
  status: 'init',
  counter: 0,
}
6、storeToRefs(store)
解构仍然具有响应式
*/
export default defineStore('counter', {
  state: () => {
    return {
      _status: 'init',
      _counter: 0,
    }
  },
  getters: {
    counter: (state) => {
      return state._counter
    },
    status(): string {
      return this._status
    },
  },
  actions: {
    increment() {
      this._counter++
    },
  },
})
