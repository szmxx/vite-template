/*
 * @Author: cola
 * @Date: 2022-10-31 11:08:30
 * @LastEditors: cola
 * @Description:
 */
import router, { addRoutes, isNotFoundRoute } from './route'
import NProgress from 'nprogress'
import { isEmpty, assign } from 'lodash'
import { getToken } from '@/utils/auth'
import useStore from '@/store/permission'
NProgress.configure({ showSpinner: false })
const WHITELIST = ['/login', '/404']
router.beforeEach(async (to, from, next) => {
  NProgress.start()
  if (isEmpty(history.state.current)) {
    assign(history.state, { current: from.fullPath })
  }
  const theme = to?.query?.theme as string
  useTheme(theme)
  if (!WHITELIST.includes(to.path)) {
    const authToken = getToken()
    // 没有 token 直接先登录
    if (!authToken) {
      next({
        path: '/login',
        query: {
          redirect: location.href,
        },
        replace: true,
      })
      return
    }
    const store = useStore()
    // 没有路由权限
    if (!store?.menuList?.length) {
      const routes = await store.getMenuList()
      addRoutes(routes)
      if (isNotFoundRoute(to)) {
        next({
          path: '/404',
          replace: true,
        })
      } else {
        next({ ...to, replace: true })
      }
      return
    }
    // 不存在此路由
    if (isNotFoundRoute(to)) {
      next({
        path: '/404',
        replace: true,
      })
      return
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})
