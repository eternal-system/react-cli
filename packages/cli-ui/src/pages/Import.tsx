import React, { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { useTranslation } from 'react-i18next'

import { Layout, Content, Loader, Folders, Toolbar } from '../components'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

interface Props {
  label: string;
}

/**
 * Import project
 */
export default function Import () {
  const { t } = useTranslation('project')
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

  function handleClick (name: string) {
    const buildUrl = url === '/' ? `/${name}` : `${url}/${name}`
    setUrl(buildUrl)
    getData(buildUrl)
  }

  function handleSubmit (e: any) {
    console.log('handleSubmit', e)
  }

  function handleReset () {
    getData(url)
  }

  // back folder in stap
  function backFolder () {
    // build array
    const newUrl = url.split('/')
    // delete last element
    const newArr = newUrl.splice(0, newUrl.length - 1)
    // create new string
    const buildUrl = newArr[0] === '' ? '/' : newArr.join('/')
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
        {`${t('folders')}:`}
        <Toolbar
          back={backFolder}
          update={handleReset}
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
