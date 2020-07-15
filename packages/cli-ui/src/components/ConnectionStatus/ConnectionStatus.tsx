import React, { useState, useEffect } from 'react'
import { SettingsContext } from '../../context'
import { unstable_batchedUpdates as batch } from 'react-dom'
import css from './style.module.scss'

export default function ConnectionStatus () {
  const { socket } = React.useContext(SettingsContext)

  const [connected, setConnected] = useState(true)
  const [status, setStatus] = useState('show')

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

  return (
    <div className={`${css.content} ${status === 'show' ? css.show : css.hidden}`}>
      {connected ? (<div className={css.connected}>
        Connected
      </div>) : (<div className={css.disconnected}>
        Disconnected
      </div>)}
    </div>
  )
}
