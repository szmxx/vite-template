/*
 * @Author: cola
 * @Date: 2022-12-22 15:23:17
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'QA',
  path: '/qa',
  redirect: '/qa/index',
  meta: {
    type: 'layout',
  },
  children: [
    {
      name: 'QAIndex',
      path: 'index',
      component: () => import('@/views/qa'),
    },
    {
      name: 'QAView',
      path: 'view/:id',
      component: () => import('@/views/qa/components/QAView.vue'),
    },
  ],
}
