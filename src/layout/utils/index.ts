/*
 * @Author: cola
 * @Date: 2023-01-09 10:20:58
 * @LastEditors: cola
 * @Description:
 */

export function isSelfRouteFn() {
  const router = useRouter()
  let pathname = ''
  if (location.pathname.startsWith('/')) {
    pathname = location.pathname.split('/')[1]
  } else {
    pathname = location.pathname.split('/')[0]
  }
  pathname = '/' + pathname
  // 是否是自身路由
  return computed(() => {
    console.log(
      'is',
      router?.options?.routes?.find?.((route) =>
        route.path.startsWith(pathname)
      ) !== void 0
    )
    return (
      router?.options?.routes?.find?.((route) =>
        route.path.startsWith(pathname)
      ) !== void 0
    )
  })
}
