/*
 * @Author: cola
 * @Date: 2023-03-27 00:27:29
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonDatePicker
    v-model="{{modelValue}}"
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonDatePicker>
`
