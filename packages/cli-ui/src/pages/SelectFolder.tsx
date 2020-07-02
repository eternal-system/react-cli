import React, { useState, useEffect, useCallback, useMemo } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Routes } from 'router'
import { Layout, Content, Loader, Folders, Toolbar } from '../components'

import mainCss from '../style/main.module.scss'

// Create new project
export default function Create () {
  const { t } = useTranslation('project')
  // Router
  const history = useHistory()

  // State
  const [url, setUrl] = useState<string[]>([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getFoldersData(url)
  }, [url])

  const isImportPage = useMemo(() => history.location.pathname === Routes.PROJECT_IMPORT, [history.location.pathname])

  const getFoldersData = useCallback(
    (arrUrl: string[]) => {
      setLoading(true)
      fetch(`/api/folders?url=/${arrUrl.join('/')}`)
        .then(res => res.json())
        .then(res => {
          batch(() => {
            setProjects(res)
            setLoading(false)
          })
        })
    },
    [url]
  )

  /**
   * Select foulder
   * @param name - nome selected foulder
   */
  function handleClick (name: string) {
    const buildUrl = url.length ? [...url, name] : [name]
    setUrl(buildUrl)
  }

  // events
  function handleSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    return isImportPage ? console.debug('Import project')
      : history.push(Routes.PROJECT_CREATE)
  }

  // reset
  function handleReset () {
    getFoldersData(url)
  }

  // create new folder
  // function createFolder () {
  //   console.log('new folder')
  // }

  // show hidden folder
  // function changeHiddenFolder () {
  //   console.log('show folder hidden')
  // }

  // back folder in stap
  function backFolder () {
    const newArr = url.splice(0, url.length - 1)
    setUrl(newArr)
  }

  function renderActionBtn () {
    return (
      <button className={mainCss.foulderBtn} onClick={handleSubmit}>
        {isImportPage ? `+ ${t('importProject')}` : `+ ${t('createNewProject')}`}
      </button>
    )
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Layout>
      <Content>
        <Toolbar
          back={backFolder}
          updateFolderData={handleReset}
          setUrlPath={setUrl}
          path={url}
        />
        <Folders folders={projects} on={handleClick}/>
        {renderActionBtn()}
      </Content>
    </Layout>
  )
}
