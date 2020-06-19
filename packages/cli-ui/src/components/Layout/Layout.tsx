import React from 'react'

function Layout ({ children }: React.PropsWithChildren<React.ReactNode>) {
  return (
    <div className="layout">
      {children}
    </div>
  )
}

export default Layout
