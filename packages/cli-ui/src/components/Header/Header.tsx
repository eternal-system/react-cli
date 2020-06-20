import React from 'react'

import logo from '../../../public/logo192.png'
import css from './style.module.css'

export default function Header ({ setTab, active, children }: any) {
  console.log('Header | match', children)

  function renderChildren () {
    return children.map((child) => (
      <span
        key={child.key}
        className={child.key === active ? css.active : ''}
        onClick={() => setTab(child.key)}
      >
        {child.props.label}
      </span>
    ))
  }

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
          {renderChildren()}
        </div>
      </div>
    </header>
  )
}
