/*
 * @Author: cola
 * @Date: 2022-06-14 14:57:27
 * @LastEditors: cola
 * @Description:
 */

interface PropTypeItem {
  scope: Record<string, Record<string, unknown>>
  render: (arg: Record<string, Record<string, unknown>>) => unknown
}
export default function TableRender(props: PropTypeItem) {
  return props.render(props.scope)
}
TableRender.props = ['scope', 'render']
