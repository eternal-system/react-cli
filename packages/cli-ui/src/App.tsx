import React from 'react'

import Create from './pages/Create'
import Projects from './pages/Projects'
import Import from './pages/Import'
import Tabs from './components/Tabs'

const App = () => {
  return (
    <div className='wrapper constent'>
      <Tabs>
        <Projects key={1} label="Projects" />
        <Create key={2} label="Create" />
        <Import key={3} label="Import"/>
      </Tabs>
    </div>
  )
}

export default App
