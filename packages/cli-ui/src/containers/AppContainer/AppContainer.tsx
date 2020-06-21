import React, { Fragment, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Routes } from '../../router'

export default function AppContainer () {
  // Router
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    if ([Routes.MAIN].includes(location.pathname as Routes)) {
      history.push(Routes.PROJECT)
    }
  }, [location])
  return <Fragment />
}
