import React, { useState, useEffect, useContext, useCallback } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'

import { SettingsContext } from 'context'
import { ProgressBar } from 'common'
import { useNotification } from '@hooks'
import { Folders, Toolbar } from '../index'

type Favorites = {
  name: string;
  path: string;
}

// Create new project
export default function FileManager () {
  const notification = useNotification()
  // State
  const { socket, selectedPath, changeSelectedPath } = useContext(SettingsContext)
  const [url, setUrl] = useState<string[]>(selectedPath)
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState<boolean>(false)
  const [favorites, setFavorites] = useState<Favorites[]>([])

  useEffect(() => {
    socket.send({
      type: 'GET_FOLDERS',
      url: `/${url.join('/')}`,
      hidden: false
    })
    socket.send({
      type: 'LIST_FAVORITE'
    })

    socket.on('folders', (res: any) => {
      batch(() => {
        setLoading(true)
        setProjects(res.project)
        setLoading(false)
      })
    })

    socket.on('foldersFavorite', (res: any) => {
      setFavorites(res.data)
    })

    socket.on('erro', (error: any) => {
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
      socket.off('foldersFavorite')
      socket.off('erro')
    }
  }, [])

  useEffect(() => {
    if (selectedPath.length && selectedPath !== url) {
      setUrl(selectedPath)
    }
  }, [selectedPath])

  useEffect(() => {
    setTimeout(() => {
      getFoldersData(url)
    }, 200)
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

  function handleAddFavorite (favorite) {
    socket.send({
      type: 'SET_FAVORITE',
      file: {
        file: `/${url.join('/')}`,
        favorite
      }
    })
  }

  return (
    <>
      <Toolbar
        back={backFolder}
        updateFolderData={handleReset}
        setUrlPath={setUrl}
        addFavorite={handleAddFavorite}
        favorites={favorites}
        path={url}
      />
      { loading && <ProgressBar progress={75} /> }
      <Folders folders={projects} onSelect={handleClick}/>
    </>
  )
}
