/*
 * @Author: cola
 * @Date: 2023-03-27 00:20:43
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonCascader
    v-model="{{modelValue}}"
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonCascader>
`
