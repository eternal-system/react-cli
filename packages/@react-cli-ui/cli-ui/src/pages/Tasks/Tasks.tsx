import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardWrap, TaskList } from '@components'

import { SettingsContext } from '../../context'

// import PlayIcon from '@icons/play.svg'
import FolderIcon from '@icons/play.svg'

import css from './style.module.scss'

export default function Tasks () {
  const { t } = useTranslation('dashboard')
  const { socket } = useContext(SettingsContext)
  const [tasks, setTask] = useState({})

  useEffect(() => {
    socket.send({
      type: 'GET_LIST_TASKS'
    })

    socket.on('tasks', (res: any) => {
      setTask(res.data)
    })

    return () => {
      socket.off('tasks')
    }
  }, [])

  function renderTasks () {
    return (
      <div className={css.wrapper}>
        <TaskList tasks={tasks}/>
        <div className={css.panel}>
          <button onClick={() => console.log('start')}>
            <FolderIcon /> <span>Run</span>
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
