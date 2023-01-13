/*
 * @Author: cola
 * @Date: 2022-06-14 15:06:40
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'table-slot',
  functional: true,
  inject: ['tableRoot'],
  props: {
    row: Object,
    column: Object,
    $index: Number,
    columnData: Object,
  },
  render: (h, ctx) => {
    return h(
      'div',
      {
        style: {
          'white-space': 'nowrap',
        },
      },
      ctx.injections.tableRoot.$scopedSlots[ctx.props.column.property]({
        row: ctx.props.row,
        column: ctx.props.column,
        index: ctx.props.$index,
        columnData: ctx.props.columnData,
      })
    )
  },
}
