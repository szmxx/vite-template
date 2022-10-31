/*
 * @Author: cola
 * @Date: 2022-10-31 10:54:02
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'Edit',
  path: '/edit',
  redirect: '/edit/index',
  children: [
    {
      name: 'EditorIndex',
      path: 'index',
      component: () => import('@/views/editor'),
    },
  ],
}
