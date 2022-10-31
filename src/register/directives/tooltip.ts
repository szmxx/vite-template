/*
 * @Author: cola
 * @Date: 2022-07-30 01:27:50
 * @LastEditors: cola
 * @Description:
 */
import { DirectiveBinding } from 'vue'
import { computePosition } from '@floating-ui/dom'
import tooltip from './CustomTooltip.vue'

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const _tooltip = document.createElement('div')
    _tooltip.className = '__custom_tooltip__'
    document.body.appendChild(_tooltip)
    const app = createApp(tooltip, {
      content: binding.value,
    })
    app.mount(_tooltip)
    computePosition(el, _tooltip, {
      placement: 'bottom',
    }).then(({ x, y }) => {
      Object.assign(_tooltip.style, {
        top: `${y}px`,
        left: `${x}px`,
      })
    })
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    el.setAttribute('data-tooltip', binding?.value)
  },
  unmounted(el: HTMLElement) {
    el.removeAttribute('data-tooltip')
    el.classList.remove('__custom_tooltip__')
  },
}
