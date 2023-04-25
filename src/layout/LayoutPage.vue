<!--
 * @Author: cola
 * @Date: 2022-07-05 16:16:23
 * @LastEditors: cola
 * @Description:
-->
<template>
  <div class="layout flex flex-nowrap h-full w-full">
    <div class="min-w-[220px] bg-darker">
      <LeftMenu></LeftMenu>
    </div>
    <div class="flex flex-col flex-1 border-l border-darker">
      <div
        class="flex items-center min-h-[60px] border-b border-darker pl-[2rem]"
      >
        <slot>DEMO 系统</slot>
      </div>
      <div class="flex-1">
        <router-view v-if="isSelfRoute"></router-view>
        <section id="subapp-viewport" class="relative w-full h-full"></section>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import LeftMenu from './components/LeftMenu.vue'
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
