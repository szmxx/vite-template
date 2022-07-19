/*
 * @Author: cola
 * @Date: 2022-07-19 14:14:09
 * @LastEditors: cola
 * @Description:
 */
let themes = import.meta.glob('@/theme/*.scss')
themes = Object.keys(themes).reduce(
  (acc: Record<string, () => Promise<{ [key: string]: any }>>, cur) => {
    const name = cur.replace(/^\.[.]?(.*\/)?/, '').replace(/\.scss$/, '')
    if (name && !acc[name]) {
      acc[name] = themes[cur]
    }
    return acc
  },
  {}
)
export async function useTheme(theme: string) {
  document.documentElement?.setAttribute('data-theme', theme)
  await themes?.[theme]?.()
}
