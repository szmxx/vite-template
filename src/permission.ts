/*
 * @Author: cola
 * @Date: 2022-10-31 11:08:30
 * @LastEditors: cola
 * @Description:
 */
import router from './route'
import NProgress from 'nprogress'
import { isEmpty, assign } from 'lodash'
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  if (isEmpty(history.state.current)) {
    assign(history.state, { current: from.fullPath })
  }

  const theme = to?.query?.theme as string
  useTheme(theme)

  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
