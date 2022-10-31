/*
 * @Author: cola
 * @Date: 2022-07-24 16:24:58
 * @LastEditors: cola
 * @Description:
 */
import { DirectiveBinding } from 'vue'
import loading from './CustomLoading.vue'
let app: any
function getLoadingComp(el: HTMLElement) {
  app = createApp(loading, {})
  app.mount(el)
  app.mask = el
}
export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    if (!el?.style?.position || el?.style?.position === 'static') {
      el.style.position = 'relative'
    }
    if (el && binding.value) {
      const mask = document.createElement('div')
      el.appendChild(mask)
      getLoadingComp(mask)
    }
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    if (!el?.style?.position || el?.style?.position === 'static') {
      el.style.position = 'relative'
    }
    if (el) {
      if (binding.value) {
        const mask = document.createElement('div')
        el.appendChild(mask)
        getLoadingComp(mask)
      } else {
        if (app?.mask) el.removeChild(app?.mask)
        app?.unmount?.()
        app = null
      }
    }
  },
}
