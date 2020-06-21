import React, { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import CheckBoxTheme from '../CheckBoxTheme/CheckBoxTheme'
import logo from '../../../public/logo192.png'
import css from './style.module.css'

export default function Header ({ setTab, active, children }: any) {
  const history = useHistory()
  console.log('Header | match', children)

  const renderChildren = useMemo(() => children.map((child) => {
    function handleSetTab () {
      setTab(child.key)
      history.push(child.key)
    }
    return (
      <span
        key={child.key}
        className={child.key === active ? css.active : ''}
        onClick={handleSetTab}
      >
        {child.props.label}
      </span>
    )
  }), [children, active])

  return (
    <header className={css.wrapperHeader} >
      <div className={css.wrapperLayout} >
        <div className={css.wrapperLogo}>
          <a href="/" >
            <img src={logo} alt="logo" />
            <span>React Project Manager</span>
          </a>
        </div>
        <div className={css.nav}>
          {renderChildren}
        </div>
        <div className="checktheme">
          <p>Dark Mode</p>
          <CheckBoxTheme />
        </div>
      </div>
    </header>
  )
}
