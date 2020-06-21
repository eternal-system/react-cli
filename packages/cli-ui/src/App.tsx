import React, { useState, useEffect } from 'react'
import { Context } from './context'

import { renderRoutes } from './router'

export default function App () {
  const theme = JSON.parse(localStorage.getItem('thememode')) ? 'dark' : 'ligth'
  console.log(localStorage.getItem('thememode'))

  const [value, setValue] = useState(JSON.parse(localStorage.getItem('thememode')))

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem('thememode')))
  }, [value])

  const getValue = (status) => {
    setValue(status)
  }

  return (
    <Context.Provider value={{
      getValue
    }}>
      <div key={theme} className={`wrapper content ${theme}`}>
        {renderRoutes()}
      </div>
    </Context.Provider>
  )
}
