import React, { useState, useEffect, useCallback } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'

import Api from 'api'
import { SettingsContext } from 'context'
import { ProgressBar } from 'common'
import { Folders, Toolbar } from '../index'

// Create new project
export default function FileManager () {
  // State
  const { selectedPath, changeSelectedPath } = React.useContext(SettingsContext)
  const [url, setUrl] = useState<string[]>(selectedPath)
  const [projects, setProjects] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (selectedPath.length && selectedPath !== url) {
      setUrl(selectedPath)
    }
  }, [selectedPath])

  useEffect(() => {
    getFoldersData(url)
  }, [url])

  const getFoldersData = useCallback(
    (arrUrl: string[]) => {
      setLoading(true)
      Api.POST('/api/folders', {
        url: `/${arrUrl.join('/')}`,
        hidden: false
      })
        .then((res) => {
          batch(() => {
            setProjects(res as string[])
            changeSelectedPath(url)
            setLoading(false)
          })
        })
        .catch((error) => {
          console.log('error', error)
          batch(() => {
            setLoading(false)
            setUrl((prevState) => prevState.splice(0, url.length - 1))
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
    setUrl((prevState) => prevState.length ? [...prevState, name] : [name])
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
    setUrl((prevState) => prevState.splice(0, url.length - 1))
  }

  return (
    <>
      <Toolbar
        back={backFolder}
        updateFolderData={handleReset}
        setUrlPath={setUrl}
        path={url}
      />
      { loading && <ProgressBar progress={75} /> }
      <Folders folders={projects} onSelect={handleClick}/>
    </>
  )
}
