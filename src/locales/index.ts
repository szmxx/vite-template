import { createI18n } from 'vue-i18n'
import zhCN from './lang/zh-CN'
import { getUrlParams } from '@/utils'
const files = import.meta.glob('./lang/*/index.ts')
export const SUPPORT_LOCALES = ['zh-CN', 'en-US']
export type SUPPORT_LOCALE_TYPE = 'zh-CN' | 'en-US'

const query = getUrlParams()
export const defaultLang = ref()
defaultLang.value = query.lang || localStorage.getItem('lang')
if (!SUPPORT_LOCALES.includes(defaultLang.value)) {
  defaultLang.value = SUPPORT_LOCALES[0]
}

const messages = {
  'zh-CN': {
    ...zhCN,
  },
}
const i18n = createI18n({
  mode: 'composition',
  legacy: false, // you must set `false`, to use Composition API
  locale: defaultLang.value,
  allowComposition: true,
  fallbackLocale: defaultLang.value,
  messages: messages,
})

setI18nLanguage(defaultLang)

export function setI18nLanguage(locale: any) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  localStorage.setItem('lang', locale)
  // axios.defaults.headers.common['Accept-Language'] = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}
export async function loadLocaleMessages(locale: string) {
  const module = files[`./lang/${locale}/index.ts`]
  const messages = await module()
  i18n.global.setLocaleMessage(locale, messages.default)
  return nextTick()
}

export default i18n
