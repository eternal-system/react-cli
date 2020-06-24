import React from 'react'

import { SettingsContext } from 'context'
import TranlateIcon from '../../../public/icons/translate.svg'
import css from './style.module.css'

export default function Footer () {
  const { changeLocale } = React.useContext(SettingsContext)
  return (
    <div className="footer">
      <TranlateIcon className={css.translate} onClick={changeLocale} />
    </div>
  )
}
