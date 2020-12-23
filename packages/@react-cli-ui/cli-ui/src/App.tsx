import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import ReactNotification from 'react-notifications-component'
import cn from 'classnames'

import i18n from './i18n'
import { Footer, ConnectionStatus } from '@components'
import { useSettings } from '@hooks'
import { SettingsContext } from '@context'
import { renderRoutes } from './router'

import css from './style/main.module.less'

export default function App () {
  const settings = useSettings()
  const styles = cn(settings.darkTheme ? css.dark : css.ligth, css.appContainer)

  return (
    <I18nextProvider i18n={i18n}>
      <SettingsContext.Provider value={settings}>
        <Router>
          <div className={styles}>
            <ConnectionStatus />
            {renderRoutes()}
            <Footer />
            <ReactNotification />
          </div>
        </Router>
      </SettingsContext.Provider>
    </I18nextProvider>
  )
}
