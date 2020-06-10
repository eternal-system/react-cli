import React, { useState, useEffect } from 'react'
import Layout from '../components/Layout'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Content from '../components/Content'

const Projects = () => {
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetch('/api/projects')
      .then(response => response.json())
      .then(res => {
        console.log(res)
        setProjects(res)
      })
  }, [])

  const handleClick = (e) => {
    console.log('click 1')
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
