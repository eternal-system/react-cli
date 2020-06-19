import React, { useState } from 'react'

import Header from '../Header'
import Footer from '../Footer'

/**
 * Component tabs
 */
function Tabs (
  { children }: React.PropsWithChildren<React.ReactNode>
) {
  const [activeTab, setActiveTab] = useState('1')

  return (
    <>
      <Header
        setTab={setActiveTab}
        active={activeTab}>
        {children}
      </Header>
      <div className="tabs" >
        <div className="tab__content" >
          {
            children.map((child) => {
              if (child.key !== activeTab) return undefined
              return child
            })
          }
        </div>
      </div>
      <Footer />
    </>
  )
}

export default Tabs
