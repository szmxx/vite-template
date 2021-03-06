/*
 * @Author: cola
 * @Date: 2022-07-19 14:14:09
 * @LastEditors: cola
 * @Description:
 */
let themes = import.meta.glob('@/theme/*/index.scss')
themes = Object.keys(themes).reduce(
  (acc: Record<string, () => Promise<unknown>>, cur) => {
    const name = cur.match(/.*\/(.*)\//)?.at(-1)
    if (name && !acc[name] && name !== 'common') {
      acc[name] = themes[cur]
    }
    return acc
  },
  {}
)
const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
darkModeMediaQuery.addListener((e) => {
  useTheme(e.matches ? 'dark' : 'default')
})

export const currentTheme = ref(localStorage.getItem('theme') || 'default')

export async function useTheme(theme: string) {
  if (!theme) {
    theme = currentTheme.value
  } else {
    currentTheme.value = theme
  }
  document.documentElement?.setAttribute('data-theme', theme)
  localStorage.setItem('theme', theme)
  await themes?.[theme]?.()
}
