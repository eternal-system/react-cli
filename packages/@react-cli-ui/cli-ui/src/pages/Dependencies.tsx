import React, { useState, useEffect, useContext } from 'react'
import { DashboardWrap, ProjectDependencies } from '@components'
import { useTranslation } from 'react-i18next'
import { SettingsContext } from '../context'

export default function Dependencies () {
  const { t } = useTranslation('dashboard')
  const { socket } = useContext(SettingsContext)
  const [dependencies, setDependencies] = useState([])

  useEffect(() => {
    socket.send({
      type: 'GET_LIST_DEPENDINCIES'
    })

    socket.on('dependencies', (res: any) => {
      setDependencies(res.data)
    })

    return () => {
      socket.off('dependencies')
    }
  }, [])

  return (
    <DashboardWrap title={t('titleDepend')}>
      <ProjectDependencies list={dependencies}/>
    </DashboardWrap>
  )
}
