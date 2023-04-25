/*
 * @Author: cola
 * @Date: 2022-10-31 10:54:02
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'Chart',
  path: '/chart',
  redirect: '/chart/index',
  children: [
    {
      name: 'ChartIndex',
      path: 'index',
      component: () => import('@/views/chart'),
    },
  ],
}
