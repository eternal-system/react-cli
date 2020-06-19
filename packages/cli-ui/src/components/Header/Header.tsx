import React from 'react'

import logo from './logo192.png'

export default function Header ({ setTab, active, children }: any) {
  console.log('Header | match', children)

  function renderChildren () {
    return children.map((child) => (
      <span
        key={child.key}
        className={child.key === active ? 'active' : ''}
        onClick={() => setTab(child.key)}
      >
        {child.props.label}
      </span>
    ))
  }

  return (
    <header className="wrapper__header" >
      <div className="wrapper__layout" >
        <div className="wrapper__logo">
          <a href="/" >
            <img src={logo} alt="logo" />
            <span>React Project Manager</span>
          </a>
        </div>
        <div className="nav">
          {renderChildren()}
        </div>
      </div>
    </header>
  )
}
