import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import './style/main.scss'

render(
  <Router>
    <App />
  </Router>, document.getElementById('root'))
