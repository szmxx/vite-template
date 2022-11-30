/*
 * @Author: cola
 * @Date: 2022-10-31 10:54:02
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'File',
  path: '/file',
  redirect: '/file/index',
  children: [
    {
      name: 'FileIndex',
      path: 'index',
      component: () => import('@/views/file'),
    },
  ],
}
