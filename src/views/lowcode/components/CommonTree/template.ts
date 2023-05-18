/*
 * @Author: cola
 * @Date: 2023-03-27 00:35:08
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonTree
    v-model="{{modelValue}}"
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonTree>
`
