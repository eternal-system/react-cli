import React from 'react'

import { SettingsContext } from 'context'
import TranlateIcon from '$icons/translate.svg'
import css from './style.module.scss'

export default function Footer () {
  const { changeLocale } = React.useContext(SettingsContext)
  return (
    <div className={css.footer}>
      <div className={css.translateIcon}><TranlateIcon className="" onClick={changeLocale} /></div>
    </div>
  )
}
