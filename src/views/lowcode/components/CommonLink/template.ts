/*
 * @Author: cola
 * @Date: 2023-03-27 00:32:53
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonLink
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonLink>
`
