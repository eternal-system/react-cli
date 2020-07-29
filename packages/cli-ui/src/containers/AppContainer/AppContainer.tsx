import React, { Fragment, useEffect, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Routes } from '../../router'
import db from '../../../db.json'

export default function AppContainer () {
  // Router
  const history = useHistory()
  const location = useLocation()
  
  useEffect(() => {
    if ([Routes.MAIN].includes(location.pathname as Routes)) {
      if(db.config?.lastOpenProject) {
        history.push(Routes.DASHBOARD)
      } else {
         history.push(Routes.PROJECT)
      }
    }
  }, [location])
  return <Fragment />
}
