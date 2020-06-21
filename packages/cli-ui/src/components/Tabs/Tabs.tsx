import React, { useState } from 'react'

import { Header, Footer } from 'components'
import { Routes } from 'router'

/**
 * Component tabs
 */
function Tabs (
  { children }: React.PropsWithChildren<React.ReactNode>
) {
  const [activeTab, setActiveTab] = useState(Routes.PROJECT)

  return (
    <>
      <Header
        setTab={setActiveTab}
        active={activeTab}>
        {children}
      </Header>
      <Footer />
    </>
  )
}

export default Tabs
