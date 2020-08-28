import React, { useState, useEffect, useContext } from 'react'
import { DashboardWrap, ProjectDependencies } from '@components'
import { useTranslation } from 'react-i18next'

import { useModal } from '@hooks'
import { DependenciesModal } from 'modals'

import AddIcon from '@icons/add.svg'
import UpdateIcon from '@icons/update.svg'

import { SettingsContext } from '../context'

export default function Dependencies () {
  const { t } = useTranslation('dependencies')
  const { socket } = useContext(SettingsContext)
  const [dependencies, setDependencies] = useState([])
  const { visible, showModal, closeModal } = useModal()

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

  function renderButton (){
    return (
      <div>
        <button onClick={showModal}><AddIcon />{t('install')}</button>
        <button><UpdateIcon />{t('update')}</button>
      </div>
    )
  }

  return (
    <DashboardWrap title={t('titleDepend')} btn={renderButton()}>
      <DependenciesModal 
        visible={visible}
        closeModal={closeModal}
        showModal={showModal}
      />
      <ProjectDependencies list={dependencies}/>
    </DashboardWrap>
  )
}
