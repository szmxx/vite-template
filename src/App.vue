<!--
 * @Author: cola
 * @Date: 2022-07-04 16:13:38
 * @LastEditors: cola
 * @Description:
-->

<template>
  <router-view v-if="isSelfRoute"></router-view>
  <LayoutPage v-else></LayoutPage>
</template>

<script lang="ts" setup>
  import LayoutPage from '@/layout'
  import { RouteRecordRaw } from 'vue-router'
  // 是否是自身路由
  const route = useRoute()
  const router = useRouter()
  const isSelfRoute = computed(()=>{
    let pathname = route.path.startsWith('/')
      ? location.pathname.split('/')[1]
      : location.pathname.split('/')[0]
    pathname = '/' + pathname
    const routes: RouteRecordRaw[] = router.getRoutes()

    for (let i = 0; i < routes.length; i++) {
      // 路由表路径和本地一致，则是本地路由
      if (routes[i].path === pathname) {
        return true
      }
    }
    return false
  })
</script>
