import React, { useState, useEffect, useContext } from 'react'
import { DashboardWrap, ProjectDependencies } from '@components'
import { SettingsContext } from '../context'

export default function Dependencies () {

  const { socket, selectedPath } = useContext(SettingsContext)
  const [dependencies, setDependencies] = useState([])

  useEffect(() => {

    socket.send({
      type: 'GET_LIST_DEPENDINCIES',
      path: selectedPath
    })

    socket.on('dependencies', (res) => {
      setDependencies(res.data)
    })

    return () => {
      socket.off('dependencies')
    }
  }, [])

  return (
    <DashboardWrap title={"Project dependencies"}>
      <ProjectDependencies list={dependencies}/>
    </DashboardWrap>
  )
}
