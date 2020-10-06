import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { SettingsContext } from '../../context'
import ComputerIcon from '@icons/computer.svg'

import css from './style.module.scss'

interface ILog {
  id: number;
  date: Date;
  message: string;
  type: string;
  tag?: string;
}

export default function Logs () {
  const { t } = useTranslation('common')
  const { socket } = useContext(SettingsContext)
  const [logs, setLogs] = useState([])

  useEffect(() => {
    socket.send({
      type: 'GET_LOGS'
    })
    socket.on('list-logs', (res: any) => {
      console.log('log', res)
      setLogs(res.data)
    })
    return () => {
      socket.off('list-logs')
    }
  }, [])

  console.log(logs)
  return (
    <div className={css.logger}>
      <div className={css.header}>
        <div className={css.icon}><ComputerIcon /></div>
        {t('logs')}
      </div>
      <div className={css.content}>
        { logs.map((log: ILog) => {
          return (
            <div className={css.wrapper} key={log.id}>
              <div className={css.type}>{log.type}</div>
              <div className={css.message}>{log.message}</div>
              <div className={css.date}>{log.date}</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
