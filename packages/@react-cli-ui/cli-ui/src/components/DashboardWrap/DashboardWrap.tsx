import React from 'react'

import css from './style.module.scss'

interface DashboardProps {
  title: string;
  children: React.PropsWithChildren<React.ReactNode>;
}

export default function DashboardWrap ({ children, title }: DashboardProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <div className={css.title}>
          {title}
        </div>
      </div>
      <div className={css.content}>
        {children}
      </div>
    </div>
  )
}
