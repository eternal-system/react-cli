import { createContext } from 'react'

function noop () {}

export const SettingsContext = createContext({
  darkTheme: false,
  locale: 'en',
  changeTheme: noop,
  changeLocale: noop
})
