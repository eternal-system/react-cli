import React from 'react'
import css from './style.module.scss'

export default function DashboardWrap({ children }: React.PropsWithChildren<React.ReactNode>) {
  return(
    <div className={css.wrapper}>
      <div className={css.top}></div>
      <div className={css.content}>
        {children}
      </div>
    </div>
  )
}
