import React from 'react'

import css from './style.module.scss'

interface DashboardProps {
  title?: string;
  children: React.PropsWithChildren<React.ReactNode>;
  btn?: JSX.Element;
  cssStyle?: React.CSSProperties;
}

export default function DashboardWrap ({ children, title, btn, cssStyle }: DashboardProps) {
  return (
    <div className={css.wrapper} style={cssStyle}>
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
