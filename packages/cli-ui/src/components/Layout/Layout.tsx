import React from 'react'

import css from './style.module.scss'

function Layout ({ children }: React.PropsWithChildren<React.ReactNode>) {
  return (
    <div className={css.layout}>
      {children}
    </div>
  )
}

export default Layout
