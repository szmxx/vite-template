import { createI18n } from 'vue-i18n'
import { Ref } from 'vue'
import zhCN from './lang/zh-CN'
import { getUrlParams } from '@/utils'
const files = import.meta.glob('./lang/*/index.ts')
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import enUs from 'element-plus/lib/locale/lang/en'
export const SUPPORT_LOCALES = ['zh-CN', 'en-US']
export type SUPPORT_LOCALE_TYPE = 'zh-CN' | 'en-US'
export const activateLocale = ref()
activateLocale.value = getActivateLocale()
const componentLocaleMap = {
  'zh-CN': zhCn,
  'en-US': enUs,
}
const messages = {
  'zh-CN': {
    ...componentLocaleMap['zh-CN'],
    ...zhCN,
  },
}
const i18n = createI18n({
  mode: 'composition',
  legacy: false, // you must set `false`, to use Composition API
  locale: activateLocale.value,
  allowComposition: true,
  fallbackLocale: activateLocale.value,
  messages: messages,
})

setI18nLanguage(activateLocale)

export function setI18nLanguage(
  locale: SUPPORT_LOCALE_TYPE | Ref<SUPPORT_LOCALE_TYPE>
) {
  locale = unref(locale)
  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale as any
  } else {
    i18n.global.locale.value = locale
  }
  localStorage.setItem('lang', locale)
  activateLocale.value = locale
  // axios.defaults.headers.common['Accept-Language'] = locale
  document.querySelector('html')?.setAttribute('lang', locale)
}
export async function loadLocaleMessages(locale: SUPPORT_LOCALE_TYPE) {
  locale = unref(locale)
  const module = files[`./lang/${locale}/index.ts`]
  const messages = await module()
  i18n.global.setLocaleMessage(locale, {
    ...componentLocaleMap[locale],
    ...messages.default,
  })
  return nextTick()
}

export function getI18nComponent(locale: SUPPORT_LOCALE_TYPE) {
  return componentLocaleMap[locale]
}

export function getActivateLocale(): SUPPORT_LOCALE_TYPE {
  const query = getUrlParams()
  let locale = query.lang || localStorage.getItem('lang') || navigator.language
  if (!locale) {
    locale = SUPPORT_LOCALES[0]
  }
  if (!SUPPORT_LOCALES.includes(locale)) {
    console.error(
      `locale [${locale}] does not exist in optional list，now reset to default locale [${SUPPORT_LOCALES[0]}]`
    )
    locale = SUPPORT_LOCALES[0]
  }
  return locale as SUPPORT_LOCALE_TYPE
}

export default i18n
