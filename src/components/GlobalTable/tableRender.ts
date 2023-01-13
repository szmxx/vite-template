/*
 * @Author: cola
 * @Date: 2022-06-14 14:57:27
 * @LastEditors: cola
 * @Description:
 */
export default {
  name: 'table-render',
  functional: true,
  props: {
    render: Function,
    row: Object,
    column: Object,
    $index: Number,
    columnData: Object,
  },
  render: (h, ctx) => {
    return ctx.props.render(h, {
      row: ctx.props.row,
      column: ctx.props.column,
      index: ctx.props.$index,
      columnData: ctx.props.columnData,
    })
  },
}
