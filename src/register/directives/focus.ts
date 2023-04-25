export default {
  mounted(el: HTMLElement) {
    if (el.nodeName === 'INPUT') {
      el?.focus?.()
    } else {
      el?.querySelector?.('input')?.focus?.()
    }
  },
}
