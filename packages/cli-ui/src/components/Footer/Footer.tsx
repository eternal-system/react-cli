import React, { useContext } from 'react'

import { SettingsContext } from 'context'
import TranlateIcon from '$icons/translate.svg'
import DarkIcon from '$icons/dark-mode.svg'
import LightIcon from '$icons/light-mode.svg'

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
      <div className={css.translateIcon}>
        {renderThemeIcon()}
      </div>
      <div className={css.translateIcon}>
        <TranlateIcon className="" onClick={changeLocale} />
      </div>
    </div>
  )
}
