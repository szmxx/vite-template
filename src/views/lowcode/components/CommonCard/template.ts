/*
 * @Author: cola
 * @Date: 2023-03-29 00:34:57
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonCard
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >
    {{slot}}
  </CommonCard>
`
