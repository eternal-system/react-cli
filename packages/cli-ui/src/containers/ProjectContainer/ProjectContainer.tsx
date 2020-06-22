import React, { useMemo, useState, useEffect } from 'react'
import { CheckBoxTheme, Footer } from 'components'
import {NavLink} from 'react-router-dom'
import useProjectContainer from './projectContainer.hook'
import { Routes } from 'router'
import logo from '../../../public/logo192.png'
import css from './style.module.css'


export default function ProjectContainer () {
  const { tabs, activeTab, handleSetTab } = useProjectContainer()
  const [value, setValue] = useState(JSON.parse(localStorage.getItem('thememode')))

  useEffect(() => {
    setValue(JSON.parse(localStorage.getItem('thememode')))
  }, [value])

  const actived = value ? 'actived' : ''

  const renderChildren = useMemo(() => tabs.map((tab) => {
    return (
      <NavLink 
        key={tab.key} 
        exact={true}
        to={tab.key}
        activeClassName={css.active}
        isActive={(match, location) => {
            if(tab.key === location.pathname){
              return true
            }
        }} 
      >
        {tab.label}
      </NavLink>
    )
  }), [activeTab])

  return (
    <>
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
        </div>

        <div className="checktheme" >
          <p className={actived}>Dark Mode</p>
          <CheckBoxTheme />
        </div>

      </header>

      <Footer />
    </>
  )
}
