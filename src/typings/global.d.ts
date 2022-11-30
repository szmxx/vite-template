/*
 * @Author: cola
 * @Date: 2022-08-01 14:54:33
 * @LastEditors: cola
 * @Description:
 */
declare module 'vue-grid-layout' {
  const install: () => void
}
declare global {
  // 低版本的 TS FileList 不是 Iterable 的，自己加一个
  interface FileList {
    [Symbol.iterator](): Iterator<File>
  }

  interface File {
    webkitRelativePath: string
  }
}
