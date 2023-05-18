/*
 * @Author: cola
 * @Date: 2023-03-27 00:25:24
 * @LastEditors: cola
 * @Description:
 */
export default `
  <CommonCodeEditor
    v-model="{{modelValue}}"
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >

  </CommonCodeEditor>
`
