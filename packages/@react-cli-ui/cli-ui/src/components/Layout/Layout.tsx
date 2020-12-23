import React from 'react'

import css from './style.module.less'

function Layout ({ children }: React.PropsWithChildren<React.ReactNode>) {
  return (
    <div className={css.layout}>
      {children}
    </div>
  )
}

export default Layout
