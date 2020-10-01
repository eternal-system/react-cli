import React from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardWrap } from '@components'

import PlayIcon from '@icons/play.svg'

import css from './style.module.scss'

export default function Tasks () {
  const { t } = useTranslation('dashboard')

  function renderTasks () {
    return (
      <div className={css.wrapper}>
        <div className={css.panel}>
          <button onClick={() => console.log('start')}>
            <PlayIcon /> <span>Run</span>
          </button>
        </div>
      </div>
    )
  }

  return (
    <DashboardWrap title={t('titleTasks')}>
      {renderTasks()}
    </DashboardWrap>
  )
}
