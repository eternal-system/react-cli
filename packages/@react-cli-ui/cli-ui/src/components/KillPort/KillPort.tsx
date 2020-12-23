import React, { useState, useEffect, useContext } from 'react'

import { Input } from 'common'
import { useNotification } from '@hooks'

import FlashIcon from '@icons/flash-filled.svg'
import { SettingsContext } from '../../context'
import cn from 'classnames'

import css from './style.module.less'

export default function KillPort () {
  const [value, setValue] = useState('')
  const notification = useNotification()
  const { socket, darkTheme } = useContext(SettingsContext)
  const styles = cn(darkTheme ? css.dark : css.ligth, css.wrapperCard)

  useEffect(() => {
    socket.on('kill-port', (res: any) => {
      setValue('')
      notification.success({
        title: res.title,
        message: res.message
      })
    })
    socket.on('kill-erro', (error: any) => {
      notification.error({
        title: error.title,
        message: error.message
      })
    })
    return () => {
      socket.off('kill-port')
      socket.off('kill-erro')
    }
  }, [])

  function handleKill (ev: any) {
    ev.preventDefault()
    if (!value) return
    socket.send({
      type: 'KILL_PORT',
      port: value
    })
  }

  function handleChange (ev: any) {
    setValue(ev.value)
  }

  function handleKeyPress (ev: React.KeyboardEvent) {
    if (ev.charCode === 13) {
      return handleKill(ev)
    }
  }

  return (
    <div className={styles}>
      <div className={css.killPors}>
        <div className={css.title}>Kill Port</div>
        <div className={css.description}>
          <div className={css.descriptionIcon}><FlashIcon /></div>
          <span>Ready to kill</span>
        </div>
        <div className={css.content}>
          <Input type="number" value={value} onChange={handleChange} onKeyPress={handleKeyPress} />
          <button onClick={handleKill}>
            <FlashIcon />
            <span>Kill</span>
          </button>
        </div>
      </div>
    </div>
  )
}
