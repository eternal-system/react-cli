import React from 'react'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Routes } from 'router'
import { Layout, Content, FileManager } from '../components'

import mainCss from '../style/main.module.scss'

// Create new project
export default function Create () {
  const { t } = useTranslation('project')
  // Router
  const history = useHistory()

  const isImportPage = React.useMemo(() => history.location.pathname === Routes.PROJECT_IMPORT, [history.location.pathname])

  // events
  function handleSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    return isImportPage ? console.debug('Import project')
      : history.push(Routes.PROJECT_CREATE)
  }

  function renderActionBtn () {
    return (
      <button className={mainCss.foulderBtn} onClick={handleSubmit}>
        {isImportPage ? `+ ${t('importProject')}` : `+ ${t('createNewProject')}`}
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
