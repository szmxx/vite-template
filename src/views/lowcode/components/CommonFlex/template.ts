/*
 * @Author: cola
 * @Date: 2023-03-29 00:36:19
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonFlex
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >
    {{slot}}
  </CommonFlex>
`
