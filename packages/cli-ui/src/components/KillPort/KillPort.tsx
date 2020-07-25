import React, { useState } from 'react'

import Api from 'api'
import { Input } from 'common'
import { useNotification } from '@hooks'

import FlashIcon from '@icons/flash-filled.svg'

import css from './style.module.scss'

export default function KillPort () {
  const [value, setValue] = useState('')
  const notification = useNotification()

  function handleKill (ev: any) {
    ev.preventDefault()
    Api.GET(`/api/kill?port=${value}`)
      .then((res) => {
        setValue('')
        notification.success({
          title: res.title,
          message: res.message
        })
      }).catch((err) => {
        notification.error({
          title: err.title,
          message: err.message
        })
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
    <div className={css.wrapperCard}>
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
