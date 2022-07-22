import i18n from '@/locales'
import {
  setI18nLanguage,
  SUPPORT_LOCALES,
  loadLocaleMessages,
  SUPPORT_LOCALE_TYPE,
  defaultLang,
} from './locales/index'
import router from '@/route'
router.beforeEach((to, from, next) => {
  console.log('from', from)
  console.log('to', to)
  let lang = to?.query?.lang as SUPPORT_LOCALE_TYPE
  if (!lang) {
    lang = defaultLang
  }
  if (SUPPORT_LOCALES.includes(lang)) {
    if (!i18n.global.availableLocales.includes(lang as any)) {
      loadLocaleMessages(lang)
    }
    setI18nLanguage(lang)
  }
  next()
})
