import React from 'react'
import type { Node } from 'react'

const Layout = ({ children }: Node) => {
  return (
    <div className="layout">
      {children}
    </div>
  )
}

export default Layout
