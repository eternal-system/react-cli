import { useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Routes } from 'router'

export default function useProjectContainer () {
  const history = useHistory()
  const location = useLocation<Routes>()

  useEffect(() => {
    if ([Routes.MAIN].includes(location.pathname as Routes)) {
      history.push(Routes.PROJECT)
    }
  }, [location])
}
