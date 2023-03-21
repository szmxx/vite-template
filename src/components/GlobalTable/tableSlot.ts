/*
 * @Author: cola
 * @Date: 2022-06-14 15:06:40
 * @LastEditors: cola
 * @Description:
 */
import { injectStrict } from '@/utils'
import { InstanceKey } from './constants'
import { h } from 'vue'
interface PropTypeItem {
  scope: Record<string, Record<string, unknown>>
  columnData: Record<string, string>
}
export default function TableSlot(props: PropTypeItem) {
  const root = injectStrict(InstanceKey)
  return h(
    'div',
    {
      style: {
        'white-space': 'nowrap',
      },
    },
    root?.slots?.[props?.columnData?.prop]?.(props.scope)
  )
}

TableSlot.props = ['scope', 'columnData']
