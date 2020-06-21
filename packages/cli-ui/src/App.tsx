import React, { useState, useEffect } from 'react'

import { renderRoutes } from './router'

export default function App () {
  const theme = (JSON.parse(localStorage.getItem('thememode')) === true) ? 'dark' : 'ligth'
  console.log(localStorage.getItem('thememode'))

  const [value, setValue] = useState(JSON.parse(localStorage.getItem('thememode')))

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem('thememode')))
  }, [value])

  return (
    <div key={theme} className={`wrapper content ${theme}`}>
      {renderRoutes()}
    </div>
  )
}
