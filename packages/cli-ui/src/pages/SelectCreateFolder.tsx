import React, { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { useHistory } from 'react-router-dom'

import { Layout, Content, Loader, Folders, Toolbar } from '../components'
import { Routes } from 'router'

/**
 * Create new project
 */
export default function Create () {
  // Router
  const history = useHistory()

  // State
  const [url, setUrl] = useState('/')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getData(url)
  }, [url])

  function getData (url?: string) {
    setLoading(true)
    fetch(`/api/folders?url=${url}`)
      .then(response => response.json())
      .then(res => {
        batch(() => {
          setProjects(res)
          setLoading(false)
        })
      })
  }

  // click on folder
  function handleClick (name: string) {
    const buildUrl = url === '/' ? `/${name}` : `${url}/${name}`
    setUrl(buildUrl)
    getData(buildUrl)
  }

  // events
  /** @TODO Add real e: types */
  function handleSubmit (e: any) {
    console.log('handleSubmit', e)
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
    console.log('back folder')
    // build array
    const newUrl = url.split('/')
    // delete last element
    const newArr = newUrl.splice(0, newUrl.length - 1)
    // create new string
    const buildUrl = newArr[0] === '' ? '/' : newArr.join('/')
    console.log(buildUrl)
    // set new url
    setUrl(buildUrl)
    // get new list data
    getData(buildUrl)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Layout>
      <Content>
        Folders:
        <Toolbar
          back={backFolder}
          update={handleReset}
          path={url}
        />
        <Folders folders={projects} on={handleClick}/>
        <button onClick={handleSubmit}>
          + Create a new project here
        </button>
      </Content>
    </Layout>
  )
}
