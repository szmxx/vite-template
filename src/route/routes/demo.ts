/*
 * @Author: cola
 * @Date: 2022-07-05 10:26:52
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'Demo',
  path: '/demo',
  redirect: '/demo/index',
  children: [
    {
      name: 'DemoIndex',
      path: 'index',
      component: () => import('@/views/demo'),
    },
  ],
}
