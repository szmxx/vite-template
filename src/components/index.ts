import { App, defineAsyncComponent, AsyncComponentLoader } from 'vue'

const topFiles = import.meta.glob('./*.vue')
const bottomFiles = import.meta.glob('./*/*.vue')
export default (app: App) => {
  for (const [path, module] of Object.entries({
    ...topFiles,
    ...bottomFiles,
  })) {
    const name = path.replace(/^\.\/(.*\/)?/, '').replace(/\.vue$/, '')
    app.component(name, defineAsyncComponent(module as AsyncComponentLoader))
  }
}
