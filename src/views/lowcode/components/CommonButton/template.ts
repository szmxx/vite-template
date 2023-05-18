/*
 * @Author: cola
 * @Date: 2023-03-26 23:44:47
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonButton
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >
  </CommonButton>
`
