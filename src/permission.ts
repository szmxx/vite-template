import router from './route'
import NProgress from 'nprogress'
NProgress.configure({ showSpinner: false })

router.beforeEach((to, from, next) => {
  console.log('to', to)
  console.log('from', from)

  const theme = to?.query?.theme as string
  useTheme(theme)

  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
