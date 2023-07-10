/*
 * @Author: cola
 * @Date: 2022-07-12 10:26:52
 * @LastEditors: cola
 * @Description:
 */
import { getPermissionTree } from '@/api/public'
import { buildPermissionTree } from '@/utils/permission'
import { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
export default defineStore('permission', {
  state: () => {
    return {
      _menuList: [] as RouteRecordRaw[],
    }
  },
  getters: {
    menuList: (state) => state._menuList,
  },
  actions: {
    setMenuList(menuList: RouteRecordRaw[]) {
      this._menuList = menuList
    },
    async getMenuList() {
      const res = await getPermissionTree()
      const routes = buildPermissionTree(res.menus)
      this.setMenuList(routes)
      return routes
    }
  },
})
