/*
 * @Author: cola
 * @Date: 2023-03-27 00:28:16
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonDropdown
    v-model="{modelValue}"
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonDropdown>
`
