import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardWrap } from '@components'
import { SettingsContext } from '../../context'

import PlayIcon from '@icons/play.svg'

import css from './style.module.scss'

export default function Tasks () {
  const { t } = useTranslation('dashboard')
  const { socket } = useContext(SettingsContext)
  const [status, setStates] = useState('')

  useEffect(() => {
  }, [status])

  function handleTask () {
    if (status === '') {
      socket.send({
        type: 'RUN_TASK',
        name: 'start'
      })
      setStates('START')
    } else {
      socket.send({
        type: 'STOP_TASK'
      })
      setStates('')
    }
  }

  function renderTasks () {
    return (
      <div className={css.wrapper}>
        <div className={css.panel}>
          <button onClick={handleTask}>
            <PlayIcon /> { status === 'START' ? <span>Stop</span> : <span>Run</span> }
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
