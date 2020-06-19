import React, { useState, useEffect } from 'react'
// eslint-disable-next-line camelcase
import { unstable_batchedUpdates } from 'react-dom'
import { Layout, Content, Loader, Folders, Toolbar } from '../components'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

/**
 * Create new project
 */
export default function Create (props) {
  const [url, setUrl] = useState('/')
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = (url?: string) => {
    setLoading(true)
    fetch(`/api/folders?url=${url}`)
      .then(response => response.json())
      .then(res => {
        unstable_batchedUpdates(() => {
          setProjects(res)
          setLoading(false)
        })
      })
  }

  useEffect(() => {
    getData(url)
  }, [url])

  // click on folder
  const handleClick = (name: string) => {
    const buildUrl = url === '/' ? `/${name}` : `${url}/${name}`
    setUrl(buildUrl)
    getData(buildUrl)
  }

  // events
  const handleSubmit = (e) => {
    console.log('handleSubmit')
  }

  // reset
  const handleReset = () => {
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
  const backFolder = () => {
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
