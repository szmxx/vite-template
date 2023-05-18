/*
 * @Author: cola
 * @Date: 2023-03-27 00:34:01
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonRate
    v-model="{{modelValue}}"
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonRate>
`
