import { createContext } from 'react'

function noop () {}

export const SettingsContext = createContext({
  darkTheme: false,
  locale: 'en',
  selectedPath: [],
  changeTheme: noop,
  changeLocale: noop,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  changeSelectedPath: (path: string[]) => {}
})
