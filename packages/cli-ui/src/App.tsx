import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import cn from 'classnames'

import i18n from './i18n'
import { Footer } from './components'
import { SettingsContext } from './context'
import { useSettings } from './hooks'
import { renderRoutes } from './router'

import css from './style/main.module.scss'

export default function App () {
  const settings = useSettings()
  const styles = cn(settings.darkTheme ? 'dark' : 'ligth', css.appContainer)

  return (
    <I18nextProvider i18n={i18n}>
      <SettingsContext.Provider value={settings}>
        <Router>
          <div className={styles}>
            {renderRoutes()}
            <Footer />
          </div>
        </Router>
      </SettingsContext.Provider>
    </I18nextProvider>
  )
}
