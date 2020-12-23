import React from 'react'

import css from './style.module.less'

function Content ({ children }: React.PropsWithChildren<React.ReactNode>) {
  return (
    <div className={css.content} >
      <div className={css.contentText}>
        {children}
      </div>
    </div>
  )
}

export default Content
