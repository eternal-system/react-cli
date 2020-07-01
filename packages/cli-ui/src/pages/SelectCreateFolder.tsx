import React, { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Routes } from 'router'
import { Layout, Content, Loader, Folders, Toolbar } from '../components'

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
    getData(url)
  }, [url])

  function getData (arrUrl: string[]) {
    setLoading(true)
    fetch(`/api/folders?url=/${arrUrl.join('/')}`)
      .then(res => res.json())
      .then(res => {
        batch(() => {
          setProjects(res)
          setLoading(false)
        })
      })
  }

  // click on folder
  function handleClick (name: string) {
    const buildUrl = url.length ? [...url, name] : [name]
    setUrl(buildUrl)
  }

  // events
  function handleSubmit (e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    history.push(Routes.PROJECT_CREATE)
  }

  // reset
  function handleReset () {
    getData(url)
  }

  // create new folder
  // const createFolder = () => {
  //   console.log('new folder')
  // }

  // show hidden folder
  // const changeHiddenFolder = () => {
  //   console.log('show folder hidden')
  // }

  // back folder in stap
  function backFolder () {
    const newArr = url.splice(0, url.length - 1)
    setUrl(newArr)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Layout>
      <Content>
        <Toolbar
          back={backFolder}
          update={handleReset}
          get={setUrl}
          path={url}
        />
        <Folders folders={projects} on={handleClick}/>
        <button onClick={handleSubmit}>
          {`+ ${t('createNewProject')}`}
        </button>
      </Content>
    </Layout>
  )
}
