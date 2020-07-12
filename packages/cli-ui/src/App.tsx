import React, { useEffect, useRef } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { I18nextProvider } from 'react-i18next'
import ReactNotification from 'react-notifications-component'
import cn from 'classnames'

import i18n from './i18n'
import { Footer } from './components'
import { SettingsContext } from './context'
import { useSettings } from './hooks'
import { renderRoutes } from './router'

import openSocket from 'socket.io-client'

import 'react-notifications-component/dist/theme.css'
import css from './style/main.module.scss'

const socket = openSocket('http://localhost:8081')

export default function App () {
  // const URL = 'ws://localhost:8080'
  const settings = useSettings()
  const styles = cn(settings.darkTheme ? 'dark' : 'ligth', css.appContainer)
  // const ws = useRef(null)

  useEffect(() => {
    console.log(socket)
  }, [])

  // useEffect(() => {
  //   ws.current = new WebSocket(URL)
  //   ws.current.onopen = () => console.log('ws opened')
  //   ws.current.onclose = () => console.log('ws closed')

  //   return () => {
  //     ws.current.close()
  //   }
  // }, [])

  return (
    <I18nextProvider i18n={i18n}>
      <SettingsContext.Provider value={settings}>
        <Router>
          <div className={styles}>
            {renderRoutes()}
            <Footer />
            <ReactNotification />
          </div>
        </Router>
      </SettingsContext.Provider>
    </I18nextProvider>
  )
}
