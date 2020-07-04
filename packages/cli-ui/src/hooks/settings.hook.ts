import { useState, useCallback, useEffect } from 'react'

import i18n from '../i18n'

const storageThemeName = 'darkTheme'
const storageLocaleName = 'locale'
const storageSelectedPathName = 'selectedPath'

export function useSettings () {
  const [darkTheme, setDarkTheme] = useState<boolean | null>(null)
  const [locale, setLocale] = useState<string | null>(null)
  const [selectedPath, setSelectedPath] = useState<string[]>([])

  useEffect(() => {
    const storedLocale = JSON.parse(localStorage.getItem(storageLocaleName)!) ?? 'en'
    const storedTheme = JSON.parse(localStorage.getItem(storageThemeName)!) ?? false
    const storedSelectedPath = JSON.parse(localStorage.getItem(storageSelectedPathName)!) ?? []
    setDarkTheme(storedTheme)
    setLocale(storedLocale)
    setSelectedPath(storedSelectedPath)
    i18n.changeLanguage(storedLocale)
  }, [])

  const changeTheme = useCallback(() => {
    localStorage.setItem(storageThemeName, JSON.stringify(!darkTheme))
    setDarkTheme(!darkTheme)
  }, [darkTheme])

  const changeLocale = useCallback(() => {
    const changedLocale = locale === 'en' ? 'ru' : 'en'
    localStorage.setItem(storageLocaleName, JSON.stringify(changedLocale))
    setLocale(changedLocale)
    i18n.changeLanguage(changedLocale)
  }, [locale])

  const changeSelectedPath = useCallback((newPath) => {
    localStorage.setItem(storageSelectedPathName, JSON.stringify(newPath))
    setSelectedPath(newPath)
  }, [selectedPath])

  return {
    locale,
    darkTheme,
    selectedPath,
    changeTheme,
    changeLocale,
    changeSelectedPath
  }
}
