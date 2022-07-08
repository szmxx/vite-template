/*
 * @Author: cola
 * @Date: 2022-07-08 16:16:07
 * @LastEditors: cola
 * @Description:
 */
const topFiles = import.meta.globEager('./*.json')
const bottomFiles = import.meta.globEager('./*/*.json')
const modules: Record<string, any> = {}
for (const [path, module] of Object.entries({ ...topFiles, ...bottomFiles })) {
  const name = path.replace(/^\.\//, '').replace(/\.json$/, '')
  path_to_obj(name, module.default)
}
// 路径层级解析
// eg: folder/package/hello.json -> {folder:{package:{hello:{}}}}
function path_to_obj(path: string, value: Record<string, unknown>) {
  const pathList = path.split('/')
  let obj = modules
  for (let i = 0; i < pathList.length; i++) {
    if (i === pathList.length - 1) {
      obj[pathList[i]] = value
    } else {
      obj[pathList[i]] = Object.assign({}, obj[pathList[i]])
    }
    obj = obj[pathList[i]] as Record<string, unknown>
  }
}

export default {
  ...modules,
}
