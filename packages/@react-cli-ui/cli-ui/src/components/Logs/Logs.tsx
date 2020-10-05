import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from '../../context'
import ComputerIcon from '@icons/computer.svg'

import css from './style.module.scss'

export default function Logs () {
  const { t } = useTranslation('common')
  const { socket } = useContext(SettingsContext)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    socket.send({
      type: 'GET_LOGS'
    })

    socket.on('tasks', (res: any) => {
      setLogs(res.data)
    })
  }, [])

  console.log(logs)
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
