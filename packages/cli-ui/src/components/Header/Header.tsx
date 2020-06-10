import React from 'react'
import logo from './logo192'
import { NavLink, useRouteMatch } from 'react-router-dom'

const Header = () => {
  // const [active, setActive] = useState('')
  const match = useRouteMatch()
  console.log('match', match)

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
          <NavLink exact to="/" >Projects</NavLink>
          <NavLink exact to="/create" >Create</NavLink>
        </div>
      </div>
    </header>
  )
}

export default Header
