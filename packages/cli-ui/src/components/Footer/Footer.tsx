import React, { useContext } from 'react'
import { Link } from 'react-router-dom'

import { Routes } from 'router'
import { SettingsContext } from 'context'

import TranlateIcon from '$icons/translate.svg'
import DarkIcon from '$icons/dark-mode.svg'
import LightIcon from '$icons/light-mode.svg'
import HomeIcon from '$icons/home-filled.svg'

import css from './style.module.scss'

export default function Footer () {
  const { darkTheme, changeTheme, changeLocale } = useContext(SettingsContext)

  function renderThemeIcon () {
    return darkTheme
      ? <LightIcon onClick={changeTheme} />
      : <DarkIcon onClick={changeTheme} />
  }

  return (
    <div className={css.footer}>
      <Link to={Routes.PROJECT} className={css.icon}>
        <HomeIcon />
      </Link>
      <div className={css.rightGroup}>
        <div className={css.icon}>
          {renderThemeIcon()}
        </div>
        <div className={css.icon}>
          <TranlateIcon onClick={changeLocale} />
        </div>
      </div>
    </div>
  )
}
