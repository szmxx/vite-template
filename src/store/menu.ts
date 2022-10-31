import { TreeItem } from './../components/GlobalTree/types'
/*
 * @Author: cola
 * @Date: 2022-07-24 12:59:21
 * @LastEditors: cola
 * @Description:
 */
import { RouteRecordRaw } from 'vue-router'
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
