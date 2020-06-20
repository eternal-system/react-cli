import React from 'react'

import { renderRoutes } from './router'

export default function App () {
  return (
    <div className='wrapper content'>
      {renderRoutes()}
    </div>
  )
}
