/*
 * @Author: cola
 * @Date: 2023-03-30 00:34:24
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonTable
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  ></CommonTable>
`
