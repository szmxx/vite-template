/*
 * @Author: cola
 * @Date: 2022-10-31 10:54:02
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'GaoDe',
  path: '/gaode',
  redirect: '/gaode/index',
  children: [
    {
      name: 'GaoDeIndex',
      path: 'index',
      component: () => import('@/views/gaode'),
    },
  ],
}
