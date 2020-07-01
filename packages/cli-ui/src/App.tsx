import React from 'react'
import { I18nextProvider } from 'react-i18next'
import cn from 'classnames'

import i18n from './i18n'
import { SettingsContext } from './context'
import { useSettings } from './hooks'
import { renderRoutes } from './router'

export default function App () {
  const { locale, darkTheme, changeTheme, changeLocale } = useSettings()
  const styles = cn(darkTheme ? 'dark' : 'ligth', 'appContainer')

  return (
    <I18nextProvider i18n={i18n}>
      <SettingsContext.Provider value={{ locale, darkTheme, changeTheme, changeLocale }}>
        <div className={styles}>
          {renderRoutes()}
        </div>
      </SettingsContext.Provider>
    </I18nextProvider>
  )
}
