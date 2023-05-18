/*
 * @Author: cola
 * @Date: 2023-04-06 21:27:58
 * @LastEditors: cola
 * @Description:
 */
export default `
  <el-form-item
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >
    {{ slot }}
  </el-form-item>
`
