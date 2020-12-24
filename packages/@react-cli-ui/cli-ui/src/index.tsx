import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import '@styles/main.less'

if (typeof document !== 'undefined') {
  const rootElem: HTMLElement | null = document.getElementById('root')

  if (!rootElem) {
    throw new Error('Not found dom element `id: root`')
  }

  ReactDOM.render(React.createElement(App), rootElem)
}
