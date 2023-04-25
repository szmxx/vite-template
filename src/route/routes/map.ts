/*
 * @Author: cola
 * @Date: 2022-10-31 10:54:02
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'Map',
  path: '/map',
  redirect: '/map/index',
  children: [
    {
      name: 'MapIndex',
      path: 'index',
      component: () => import('@/views/map'),
    },
  ],
}
