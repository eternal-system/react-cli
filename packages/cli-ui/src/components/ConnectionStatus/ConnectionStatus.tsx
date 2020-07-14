import React, { useState, useEffect } from 'react'
import { SettingsContext } from '../../context'

export default function ConnectionStatus () {
  const { socket } = React.useContext(SettingsContext)

  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState('show')

  useEffect(() => {
    socket.on('connect', () => {
        setStatus('show')
        setConnected(true)
        setTimeout(() => {
            setStatus('hidden')
        }, 300)
        socket.on('disconnect', function() {
            setStatus('show')
            setTimeout(() => {
                setStatus('hidden')
            }, 300)
            setConnected(false)
        })
    })
    return () => {
        socket.off('connect')
        socket.off('disconnect')
        setConnected(false)
      }
  }, [status])

  return (
    <div className={`content ${status}`}>
      {connected ? (<div className="connected">
        Connected
      </div>) : (<div className="disconnected">
        Disconnected
      </div>)}
    </div>
  )
}
