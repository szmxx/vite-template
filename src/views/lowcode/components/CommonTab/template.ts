/*
 * @Author: cola
 * @Date: 2023-03-29 00:38:20
 * @LastEditors: cola
 * @Description:
 */
export default `
  <el-tabs
    {{#each-in complexAttrs}}
      :{{key}}="{{value}}"
    {{/each-in}}
    {{#each-in plainAttrs}}
      {{key}}="{{value}}"
    {{/each-in}}
  >
    {{slot}}
  </el-tabs>
`
