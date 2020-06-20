import React from 'react'

import { Routes } from 'router'
import { Create, Projects, Import } from 'pages'
import { Tabs } from 'components'

export default function App () {
  return (
    <div className='wrapper content'>
      <Tabs>
        <Projects key={Routes.PROJECTS_SELECT} label="Projects" />
        <Create key={Routes.PROJECTS_CREATE} label="Create" />
        <Import key={Routes.PROJECTS_IMPORT} label="Import"/>
      </Tabs>
    </div>
  )
}
