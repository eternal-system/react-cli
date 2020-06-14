import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'
import Loader from '../components/Loader'
import Folders from '../components/Folders'
import Toolbar from '../components/Toolbar'
/**
 * Create new project
 */
const Create = () => {
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
      <Header />
      <Content>
        Folders:
        <Toolbar update={getData}/>
        <Folders folders={projects} on={handleClick}/>

        <button onClick={handleSubmit}>
          + Create a new project here
        </button>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Create
