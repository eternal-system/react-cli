import React from 'react'

import { Create, Projects, Import } from './pages'
import { Tabs } from './components'

export default function App () {
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
