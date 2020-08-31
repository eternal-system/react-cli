import React from 'react'

import css from './style.module.scss'

interface DashboardProps {
  title: string;
  children: React.PropsWithChildren<React.ReactNode>;
  btn?: JSX.Element;
}

export default function DashboardWrap ({ children, title, btn }: DashboardProps) {
  return (
    <div className={css.wrapper}>
      <div className={css.top}>
        <div className={css.title}>
          {title}
        </div>
        <div className={css.rightGroup}>
          {btn}
        </div>
      </div>
      <div className={css.content}>
        {children}
      </div>
    </div>
  )
}
