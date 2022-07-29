import { PropType } from 'vue'
import { RouteRecord } from 'vue-router'

/*
 * @Author: cola
 * @Date: 2022-07-24 03:03:30
 * @LastEditors: cola
 * @Description:
 */

export const breadcrumb = {
  list: {
    type: Array as PropType<RouteRecord[]>,
    default: () => [],
  },
  separator: {
    type: String,
    default: '/',
  },
}
