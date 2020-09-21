import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { DashboardWrap, TaskList } from '@components'

import { SettingsContext } from '../../context'

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
      <div >
        <TaskList tasks={tasks}/>
      </div>
    )
  }

  return (
    <DashboardWrap title={t('titleTasks')}>
      {renderTasks()}
    </DashboardWrap>

  )
}
