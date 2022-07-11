import i18n, { getActivateLocale } from '@/locales'
import { setI18nLanguage, loadLocaleMessages } from './locales/index'
import router from '@/route'
router.beforeEach((to, from, next) => {
  console.log('from', from)
  console.log('to', to)
  const locale = getActivateLocale()
  if (!i18n.global.availableLocales.includes(locale)) {
    loadLocaleMessages(locale)
  }
  setI18nLanguage(locale)
  next()
})
