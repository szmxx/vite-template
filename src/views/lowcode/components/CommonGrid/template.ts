/*
 * @Author: cola
 * @Date: 2023-03-30 00:30:06
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonGrid
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >
    {{slot}}
  </CommonGrid>
`
