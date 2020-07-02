import React, { useState, useEffect, useCallback } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Layout, Content, Loader, Folders, Toolbar } from '../components'

/**
 * Import project
 */
export default function Import () {
  const { t } = useTranslation('project')

  // State
  const [url, setUrl] = useState<string[]>([])
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getFoldersData(url)
  }, [url])

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
    console.log('Import - handleSubmit')
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
        <button onClick={handleSubmit}>
          {`+ ${t('importProject')}`}
        </button>
      </Content>
    </Layout>
  )
}
