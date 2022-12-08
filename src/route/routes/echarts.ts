/*
 * @Author: cola
 * @Date: 2022-10-31 10:54:02
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'Echarts',
  path: '/echarts',
  redirect: '/echarts/index',
  children: [
    {
      name: 'EchartsIndex',
      path: 'index',
      component: () => import('@/views/echarts'),
    },
  ],
}
