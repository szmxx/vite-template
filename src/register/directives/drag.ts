/*
 * @Author: cola
 * @Date: 2022-12-01 14:45:48
 * @LastEditors: cola
 * @Description:
 */
export default {
  mounted(el: HTMLElement) {
    el.addEventListener('mousedown', () => {
      const parent = el.parentElement
      const {
        top = 0,
        left = 0,
        width = 0,
        height = 0,
      } = parent?.getBoundingClientRect() || {}
      function mousemove(evt: MouseEvent) {
        const { offsetX, offsetY } = evt
        if (
          offsetX > left &&
          offsetX < left + width &&
          offsetY > top &&
          offsetY < top + height
        ) {
          el.style.transform = `translate(${offsetX}px,${offsetY}px)`
        }
      }
      function mousedown() {
        document.removeEventListener('mousedown', mousedown)
        document.removeEventListener('mousemove', mousemove)
      }
      document.addEventListener('mousemove', mousemove)
      document.addEventListener('mouseup', mousedown)
    })
  },
}
