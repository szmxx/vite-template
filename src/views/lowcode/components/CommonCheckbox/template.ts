/*
 * @Author: cola
 * @Date: 2023-03-27 00:21:39
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonCheckbox
    v-model="{{modelValue}}"
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonCheckbox>
`
