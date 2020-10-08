import React, { useState, useContext, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CurrentPath, Logs } from '@components'

import { Routes } from 'router'
import { SettingsContext } from 'context'

import TranlateIcon from '@icons/translate.svg'
import DarkIcon from '@icons/dark-mode.svg'
import LightIcon from '@icons/light-mode.svg'
import HomeIcon from '@icons/home-filled.svg'
import ComputerIcon from '@icons/computer.svg'

import css from './style.module.scss'

export default function Footer () {
  const location = useLocation()
  const [toggle, setToggle] = useState('')
  const [toggleLog, setToggleLog] = useState<boolean>(false)
  const { darkTheme, changeTheme, changeLocale, selectedPath } = useContext(SettingsContext)

  useEffect(() => {
    setToggle(location.pathname.replace('/', ''))
  }, [location])

  function renderThemeIcon () {
    return darkTheme
      ? <LightIcon onClick={changeTheme} />
      : <DarkIcon onClick={changeTheme} />
  }

  function handleClick () {
    const value = toggle === 'project' ? 'dashboard' : 'project'
    setToggle(value)
  }

  function handleToggleLog () {
    setToggleLog(!toggleLog)
  }

  return (
    <div className={css.footer}>
      { toggleLog && (
        <Logs />
      )}
      <div className={css.content}>
        <Link to={toggle === 'project'
          ? Routes.DASHBOARD
          : Routes.PROJECT } onClick={handleClick} className={css.icon}>
          <HomeIcon />
        </Link>
        {selectedPath && localStorage.getItem('selectedPath') && (
          <CurrentPath url={selectedPath}/>
        )}
        <div className={css.log} onClick={handleToggleLog}>
          <div className={css.iconLog}><ComputerIcon /></div>
          🌠  {`Ready on http://localhost: ${process.env.DEV_CLIENT_PORT ?? 8080}`}
        </div>
        <div className={css.rightGroup}>
          <div className={css.icon}>
            {renderThemeIcon()}
          </div>
          <div className={css.icon}>
            <TranlateIcon onClick={changeLocale} />
          </div>
        </div>
      </div>
    </div>
  )
}
