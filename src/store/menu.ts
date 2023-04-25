/*
 * @Author: cola
 * @Date: 2022-10-31 11:08:30
 * @LastEditors: cola
 * @Description:
 */
import { TreeItem } from './../components/GlobalTree/types'
import { defineStore } from 'pinia'
import { getMenuList } from '@/api/public'
export default defineStore('menu', {
  state: () => {
    return {
      _menuList: [] as TreeItem[],
    }
  },
  getters: {
    menuList: (state) => state._menuList,
  },
  actions: {
    async getMenu() {
      const list = await getMenuList()
      this._menuList = list
    },
    setMenuList(list: TreeItem[]) {
      this._menuList = list
    },
  },
})
