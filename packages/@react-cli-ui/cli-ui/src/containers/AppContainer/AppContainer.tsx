import React, { Fragment, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { SettingsContext } from 'context'
import { Routes } from 'router'

export default function AppContainer () {
  const { socket } = React.useContext(SettingsContext)
  // Router
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    socket.send({
      type: 'GET_LAST_OPEN_PROJECT'
    })

    socket.on('lastOpenProject', (msg: any) => {
      if ([Routes.MAIN].includes(location.pathname as Routes)) {
        if (msg.data) {
          history.push(Routes.DASHBOARD)
        } else {
          history.push(Routes.PROJECT)
        }
      }
    })
    return () => {
      socket.off('lastOpenProject')
    }
  }, [])

  return <Fragment />
}
