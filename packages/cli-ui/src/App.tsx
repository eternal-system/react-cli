import React from 'react'
import Create from './pages/Create'
import Projects from './pages/Projects'
import Tabs from './components/Tabs'

const App = () => {
  return (
    <div className='wrapper constent'>
      <Tabs>
        <Projects label="Projects" key={1} />
        <Create label="Create" key={2} />
      </Tabs>
    </div>
  )
}

export default App
