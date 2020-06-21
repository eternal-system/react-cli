import React, { useState, useEffect } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'

import { Layout, Content, Loader, Folders, Toolbar } from '../components'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

interface Props {
  label: string;
}

/**
 * Import project
 */
export default function Import (props: Props) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  function getData (url?: string) {
    console.log('getData')
    setLoading(true)
    fetch('/api/folders')
      .then(response => response.json())
      .then(res => {
        console.log(res)
        batch(() => {
          setProjects(res)
          setLoading(false)
        })
        console.log('loading false')
      })
  }

  useEffect(() => {
    console.log(props)
    getData()
  }, [])

  function handleClick (name: string) {
    console.log('click 1', name)
  }

  function handleSubmit (e) {
    console.log('handleSubmit', e)
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Layout>
      <Content>
        Folders:
        <Toolbar update={getData}/>
        <Folders folders={projects} on={handleClick}/>
        <button onClick={handleSubmit}>
          + Import project
        </button>
      </Content>
    </Layout>
  )
}
