import React, { useState, useEffect, useContext } from 'react'
import { DashboardWrap } from '@components'
import { SettingsContext } from '../../context'
import { useLocation } from 'react-router-dom'

import PlayIcon from '@icons/play.svg'
import cn from 'classnames'
import css from './style.module.scss'

export default function Tasks () {
  const location = useLocation()
  const { socket, darkTheme } = useContext(SettingsContext)
  const [status, setStates] = useState('')
  const styles = cn(darkTheme ? css.dark : css.ligth, css.wrapper)

  useEffect(() => {
  }, [status])

  function handleTask () {
    const name = location.pathname.split('/')[3]
    if (status === '') {
      socket.send({
        type: 'RUN_TASK',
        name
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
      <div className={styles}>
        <div className={css.panel}>
          <button onClick={handleTask}>
            <PlayIcon /> { status === 'START' ? <span>Stop</span> : <span>Run</span> }
          </button>
        </div>
      </div>
    )
  }

  return (
    <DashboardWrap>
      {renderTasks()}
    </DashboardWrap>
  )
}
