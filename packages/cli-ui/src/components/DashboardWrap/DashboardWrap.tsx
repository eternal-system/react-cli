import React from 'react'

import css from './style.module.scss'


interface DashboarProps {
  title: string;
  children: React.PropsWithChildren<React.ReactNode>;
}

export default function DashboardWrap ({ children, title }: DashboarProps) {
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
