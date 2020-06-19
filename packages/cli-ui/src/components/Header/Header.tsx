import React from 'react'
import logo from './logo192'

const Header = ({ setTab, active, children }: any) => {
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
          {children.map((child) => {
            return (
              <span
                key={child.key}
                className={child.key === active ? 'active' : ''}
                onClick={() => setTab(child.key)}
              >
                {child.props.label}
              </span>
            )
          })}

        </div>
      </div>
    </header>
  )
}

export default Header
