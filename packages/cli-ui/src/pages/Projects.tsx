import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'
import Loader from '../components/Loader'

const Projects = () => {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/projects')
      .then(response => response.json())
      .then(res => {
        console.log(res)
        setProjects(res)
        setLoading(false)
      })
  }, [])

  const handleClick = (e) => {
    console.log('click 1')
  }

  if (loading) {
    return <Loader />
  }

  return (
    <Layout>
      <Header />
      <Content>
        Folders:

        {
          projects.length ? projects.map((name, i) => {
            return (
              <div key={i}>
                {name}
              </div>
            )
          }) : 'No existing projects'
        }

        <button onClick={handleClick}>
          + Create a new project here
        </button>
      </Content>
      <Footer />
    </Layout>
  )
}

export default Projects
