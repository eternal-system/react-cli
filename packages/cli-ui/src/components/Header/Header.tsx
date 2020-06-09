import React from 'react'
import logo from './logo192'

const Header = () => {
  return (
    <header className="wrapper__header" >
      <div className="wrapper__layout" >
        <div className="wrapper__logo">
          <a href="/" >
            <img src={logo} alt="logo" />
            <span>React</span>
          </a>
        </div>
        <div className="nav">
          <a href="#"> Tab 1 </a>
          <a href="#" > Tab 2 </a>
          <a href="#" > Tab 3 </a>
        </div>
      </div>
    </header>
  )
}

export default Header
