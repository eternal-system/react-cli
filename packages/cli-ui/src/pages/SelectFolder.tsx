import React, { useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { SettingsContext } from '../context'
import { Routes } from 'router'
import { Layout, Content, FileManager } from '@components'
import { useNotification } from '@hooks'

import AddIcon from '@icons/add.svg'

import mainCss from '../style/main.module.scss'

// Create new project
export default function Create () {
  const { t } = useTranslation('project')
  // Router
  const history = useHistory()
  const notification = useNotification()
  const { socket, selectedPath } = useContext(SettingsContext)

  const isImportPage = React.useMemo(() => history.location.pathname === Routes.PROJECT_IMPORT, [history.location.pathname])

  useEffect(() => {
    socket.on('notification', () => {
      history.push(Routes.PROJECT)
    })
    socket.on('erro-import-project', (error) => {
      console.log(error)
      notification.error({
        title: error.title,
        message: error.message
      })
    })
    return () => {
      socket.off('notification')
      socket.off('erro-import-project')
    }
  }, [])

  // events
  function handleSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    return isImportPage ? importProject()
      : history.push(Routes.PROJECT_CREATE)
  }

  function importProject() {
    socket.send({
      type: 'IMPORT_PROJECT',
      path: selectedPath
    })
  }

  function renderActionBtn () {
    return (
      <button className={mainCss.foulderBtn} onClick={handleSubmit}>
        <AddIcon />{isImportPage ? `${t('importProject')}` : `${t('createNewProject')}`}
      </button>
    )
  }

  return (
    <Layout>
      <Content>
        <FileManager />
        {renderActionBtn()}
      </Content>
    </Layout>
  )
}
