import React, { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import DisconectIcon from '@icons/cloud-off.svg'
import ConnectingIcon from '@icons/react-logo.svg'

import { SettingsContext } from 'context'
import css from './style.module.scss'

export default function ConnectionStatus () {
  const { t } = useTranslation('common')
  const { socket } = React.useContext(SettingsContext)

  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState('show')

  const styleCss = cn(css.content, status === 'show' ? css.show : css.hidden)

  useEffect(() => {
    socket.on('connect', () => {
      batch(() => {
        setStatus('show')
        setConnected(true)
        setTimeout(() => {
          setStatus('hidden')
        }, 700)
      })
      socket.on('disconnect', function () {
        batch(() => {
          setStatus('show')
          setConnected(false)
        })
      })
    })
    return () => {
      socket.off('connect')
      socket.off('disconnect')
      setConnected(false)
    }
  }, [])

  function renderStatus () {
    if (connected) {
      return (
        <div className={css.connected}>
          <ConnectingIcon className={css.svgConnected}/>
          {t('connect')}
        </div>
      )
    }
    return (
      <div className={css.disconnected}>
        <DisconectIcon />
        {t('disconnect')}
      </div>
    )
  }

  return (
    <div className={styleCss}>
      {renderStatus()}
    </div>
  )
}
