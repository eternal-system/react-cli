import React, { useContext } from 'react'
import cn from 'classnames'

import { SettingsContext } from '@context'

import css from './style.module.less'

interface DashboardProps {
  title?: string;
  children: React.PropsWithChildren<React.ReactNode>;
  btn?: JSX.Element;
  cssStyle?: React.CSSProperties;
}

export default function DashboardWrap ({ children, title, btn, cssStyle }: DashboardProps) {
  const { darkTheme } = useContext(SettingsContext)
  const styles = cn(css.wrapper, {
    [css.dark]: darkTheme
  })

  return (
    <div className={styles} style={cssStyle}>
      <div className={css.top}>
        <div className={css.title}>{title}</div>
        <div className={css.rightGroup}>{btn}</div>
      </div>
      <div className={css.content}>{children}</div>
    </div>
  )
}
