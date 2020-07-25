import React, { useState, useEffect, useContext, useCallback } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'

import { SettingsContext } from 'context'
import { ProgressBar } from 'common'
import { useNotification } from 'hooks'
import { Folders, Toolbar } from '../index'

// Create new project
export default function FileManager () {
  const notification = useNotification()
  // State
  const { socket, selectedPath, changeSelectedPath } = useContext(SettingsContext)
  const [url, setUrl] = useState<string[]>(selectedPath)
  const [projects, setProjects] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    socket.send({
      type: 'GET_FOLDERS',
      url: `/${url.join('/')}`,
      hidden: false
    })

    socket.on('folders', (res) => {
      batch(() => {
        setLoading(true)
        setProjects(res.data as string[])
        setLoading(false)
      })
    })

    socket.on('erro', (error) => {
      batch(() => {
        setLoading(false)
        setUrl((prevState) => prevState.splice(0, url.length - 1))
      })
      notification.error({
        title: error.message,
        message: error.error.path
      })
    })

    return () => {
      socket.off('folders')
      socket.off('erro')
    }
  }, [])

  useEffect(() => {
    if (selectedPath.length && selectedPath !== url) {
      setUrl(selectedPath)
    }
  }, [selectedPath])

  useEffect(() => {
    console.log(url)
    getFoldersData(url)
  }, [url])

  const getFoldersData = useCallback(
    (arrUrl: string[]) => {
      batch(() => {
        changeSelectedPath(arrUrl)
        setLoading(true)
      })
      socket.send({
        type: 'GET_FOLDERS',
        url: `/${url.join('/')}`,
        hidden: false
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
