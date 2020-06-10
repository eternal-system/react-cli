import React from 'react'
import Home from './pages/Home'
import Create from './pages/Create'
import Projects from './pages/Projects'

import {
  Switch,
  Route
} from 'react-router-dom'

const App = () => {
  return (
    <div className='wrapper constent'>
      <Switch>
        <Route path="/" exact={true} component={Projects} />
        <Route path="/create" exact={true} component={Create} />
        {/* <Route path="/projects" exact={true} component={Projects} /> */}
      </Switch>
    </div>
  )
}

export default App
