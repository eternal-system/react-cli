import { useState, useCallback, useEffect } from 'react'

import i18n from '../i18n'

const storageThemeName = 'darkTheme'
const storageLocaleName = 'locale'

export function useSettings () {
  const [darkTheme, setDarkTheme] = useState<boolean | null>(null)
  const [locale, setLocale] = useState<string | null>(null)

  useEffect(() => {
    setDarkTheme(JSON.parse(localStorage.getItem(storageThemeName)) ?? true)
    setLocale(JSON.parse(localStorage.getItem(storageLocaleName)) ?? 'en')
  }, [])

  const changeTheme = useCallback(() => {
    localStorage.setItem(storageThemeName, JSON.stringify(!darkTheme))
    setDarkTheme(!darkTheme)
  }, [darkTheme])

  const changeLocale = useCallback(() => {
    const changedLocale = locale === 'en' ? 'ru' : 'en'
    localStorage.setItem(storageLocaleName, JSON.stringify(changedLocale))
    i18n.changeLanguage(changedLocale)
    setLocale(changedLocale)
  }, [locale])

  return { locale, darkTheme, changeTheme, changeLocale }
}
