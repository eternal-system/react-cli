import React from 'react'
import { SettingsContext } from '../../context'

export default function ConnectionStatus () {
  const { socket } = React.useContext(SettingsContext)

  useEffect(() => {
    socket.on('connect', () => {
        console.log('connect')
    })
    return () => {
        socket.off('connect')
      }
  }, [])

  return (
    <div className="content">
      {connected ? (<div className="connected">
        Connected
      </div>) : (<div className="disconnected">
        Disconnected
      </div>)}
    </div>
  )
}
