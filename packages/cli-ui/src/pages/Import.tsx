import React, { useState, useEffect } from 'react'

import Layout from '../components/Layout'
import Content from '../components/Content'
import Loader from '../components/Loader'
import Folders from '../components/Folders'
import Toolbar from '../components/Toolbar'
// import Header from '../components/Header'
// import Footer from '../components/Footer'

/**
 * Import project
 */
function Import (props) {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  const getData = (url?: string) => {
    console.log('getData')
    setLoading(true)
    fetch('/api/projects')
      .then(response => response.json())
      .then(res => {
        console.log(res)
        setProjects(res)
        setLoading(false)
        console.log('loading false')
      })
  }

  useEffect(() => {
    console.log(props)
    getData()
  }, [])

  const handleClick = (name: string) => {
    console.log('click 1', name)
  }

  const handleSubmit = (e) => {
    console.log('handleSubmit')
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

export default Import
