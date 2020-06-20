import React from 'react'

import { Routes } from 'router'
import { Create, Projects, Import } from 'pages'
import { Tabs } from 'components'
import useProjectContainer from './projectContainer.hook'

export default function App () {
  useProjectContainer()

  return (
    <div className='wrapper content'>
      <Tabs>
        <Projects key={Routes.PROJECT} label="Projects" />
        <Create key={Routes.PROJECT_SELECT} label="Create" />
        <Import key={Routes.PROJECT_IMPORT} label="Import"/>
      </Tabs>
    </div>
  )
}
