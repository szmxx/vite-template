/*
 * @Author: cola
 * @Date: 2022-12-21 12:01:23
 * @LastEditors: cola
 * @Description:
 */

enum Component {
  GlobalInput,
}
export interface FormItem {
  key: string | number
  component: string
  label: string
  group: boolean
}
