/*
 * @Author: cola
 * @Date: 2023-03-27 00:28:16
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonDivider
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonDivider>
`
