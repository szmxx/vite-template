import { createI18n } from 'vue-i18n'
import { nextTick } from 'vue'
import zhCN from './lang/zh-CN'
import { getUrlParams } from '@/utils'
const files = import.meta.glob('./lang/*/index.ts')

export type SUPPORT_LOCALE_TYPE = 'zh-CN' | 'en-US'
export const SUPPORT_LOCALES: SUPPORT_LOCALE_TYPE[] = ['zh-CN', 'en-US']
export interface IModule {
  default: Record<string, unknown>
}

const query = getUrlParams()
export let defaultLang = (query.lang ||
  localStorage.getItem('lang')) as SUPPORT_LOCALE_TYPE
if (!SUPPORT_LOCALES.includes(defaultLang)) {
  defaultLang = SUPPORT_LOCALES[0]
}

const messages = {
  'zh-CN': {
    ...zhCN,
  },
}
const i18n = createI18n({
  mode: 'composition',
  legacy: false, // you must set `false`, to use Composition API
  locale: defaultLang,
  allowComposition: true,
  fallbackLocale: defaultLang,
  messages: messages,
})

setI18nLanguage(defaultLang)

export function setI18nLanguage(locale: any) {
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale
  } else {
    i18n.global.locale.value = locale
  }
  // axios.defaults.headers.common['Accept-Language'] = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}
export async function loadLocaleMessages(locale: SUPPORT_LOCALE_TYPE) {
  const module = files[`./lang/${locale}/index.ts`]
  const messages = (await module()) as IModule
  i18n.global.setLocaleMessage(locale, messages.default)
  return nextTick()
}

export default i18n
