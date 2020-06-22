import React, { useState, useEffect } from 'react'
import { I18nextProvider } from 'react-i18next'
import i18n from './i18n'

import { Context } from './context'
import { renderRoutes } from './router'

export default function App () {
  const getLocalStorage = JSON.parse(localStorage.getItem('thememode'))
  const theme = getLocalStorage ? 'dark' : 'ligth'

  const [value, setValue] = useState(getLocalStorage)

  useEffect(() => {
    setValue(getLocalStorage)
  }, [value])

  const getValue = (status) => setValue(status)

  return (
    <I18nextProvider i18n={i18n}>
      <Context.Provider value={{ getValue }}>
        <div key={theme} className={`wrapper content ${theme}`}>
          {renderRoutes()}
        </div>
      </Context.Provider>
    </I18nextProvider>
  )
}
