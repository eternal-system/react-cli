import React, { useMemo, useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import CheckBoxTheme from '../CheckBoxTheme/CheckBoxTheme'
import logo from '@public/logo192.png'
import css from './style.module.less'

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

  const [value, setValue] = useState(JSON.parse(localStorage.getItem('thememode')))

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem('thememode')))
  }, [value])

  const actived = value ? 'actived' : ''

  console.log(value)

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
        <div className="checktheme" >
          <p className={actived}>Dark Mode</p>
          <CheckBoxTheme />
        </div>
      </div>
    </header>
  )
}
