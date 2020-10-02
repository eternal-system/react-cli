import React from 'react'
import { useTranslation } from 'react-i18next'

import ComputerIcon from '@icons/computer.svg'

import css from './style.module.scss'

export default function Logs () {
  const { t } = useTranslation('common')

  return (
    <div className={css.logger}>
      <div className={css.header}>
        <div className={css.icon}><ComputerIcon /></div>
        {t('logs')}
      </div>
      <div className={css.content}>
        list
      </div>
    </div>
  )
}
