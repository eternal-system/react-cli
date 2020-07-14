import React, { useState, useEffect } from 'react'
import { SettingsContext } from '../../context'

export default function ConnectionStatus () {
  const { socket } = React.useContext(SettingsContext)

  const [connected, setConnected] = useState(false)
  const [status, setStatus] = useState('show')

  useEffect(() => {
    socket.on('connect', () => {
        setStatus('show')
        console.log('connect')
        setConnected(true)
        setTimeout(() => {
            setStatus('hidden')
        }, 500)
        socket.on('disconnect', function() {
            setStatus('show')
            console.log('disconnect')
            setTimeout(() => {
                setStatus('hidden')
            }, 500)
            setConnected(false)
        })
    })
    return () => {
        socket.off('connect')
        socket.off('disconnect')
        console.log('disconnect')
        setConnected(false)
      }
  }, [])

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
