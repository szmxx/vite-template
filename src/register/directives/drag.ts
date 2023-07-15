/*
 * @Author: cola
 * @Date: 2022-12-01 14:45:48
 * @LastEditors: cola
 * @Description:
 */
export default {
  mounted(el: HTMLElement) {
    el.addEventListener('pointerdown', (startEvt: PointerEvent) => {
      startEvt.stopPropagation()
      startEvt.preventDefault()
      ;(startEvt.target as HTMLElement).setPointerCapture(startEvt.pointerId)
      const parent = el.parentElement
      const {
        top = 0,
        left = 0,
        width = 0,
        height = 0,
      } = parent?.getBoundingClientRect() || {}
      function pointermove(endEvt: MouseEvent) {
        const xOffset = endEvt.clientX - startEvt.clientX
        const yOffset = endEvt.clientY - startEvt.clientY
        el.style.top = yOffset + 'px'
        el.style.left = xOffset + 'px'
      }
      function pointerup() {
        document.removeEventListener('pointermove', pointermove)
        document.removeEventListener('pointerup', pointerup)
      }
      document.addEventListener('pointermove', pointermove)
      document.addEventListener('pointerup', pointerup)
    })
    el.addEventListener('pointerup', (evt: PointerEvent) => {
      ;(evt.target as HTMLElement).releasePointerCapture(evt.pointerId)
    })
  },
}
