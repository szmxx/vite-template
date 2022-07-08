import i18n from '@/locales'
import {
  setI18nLanguage,
  SUPPORT_LOCALES,
  loadLocaleMessages,
  defaultLang,
} from './locales/index'
import router from '@/route'
router.beforeEach((to, from, next) => {
  console.log('from', from)
  console.log('to', to)
  console.log('defaultLang', defaultLang)
  const lang = to?.query?.lang as string
  if (SUPPORT_LOCALES.includes(lang)) {
    if (!i18n.global.availableLocales.includes(lang as any)) {
      loadLocaleMessages(lang)
    }
    setI18nLanguage(lang)
  }
  next()
})
