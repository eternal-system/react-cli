import React from 'react'
import Create from './pages/Create'
import Projects from './pages/Projects'
import Import from './pages/Import'
import Tabs from './components/Tabs'

const App = () => {
  return (
    <div className='wrapper content content__bg'>
      <Tabs>
        <Projects label="Projects" key={1} />
        <Create label="Create" key={2} />
        <Import label="Import" key={3} />
      </Tabs>
    </div>
  )
}

export default App
