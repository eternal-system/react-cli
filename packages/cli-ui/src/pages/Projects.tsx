import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'

import { Layout, Content, Empty, ProjectFilter, ProjectList } from '../components'
import { SettingsContext } from '../context'

export interface Project {
  id: number;
  manager: string;
  name: string;
  path: string;
  preset: string;
}

export default function Projects () {
  const { t } = useTranslation('project')
  const { socket } = useContext(SettingsContext)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    socket.send({
      type: 'GET_PROJECTS'
    })

    socket.on('projects', (res) => {
      console.log('test get projects', res.data)
      setProjects(res.data)
    })

    return () => {
      socket.off('projects')
    }
  }, [])

  return (
    <Layout>
      <Content>
        {
          projects.length ? (
            <>
              <ProjectFilter projects={projects} onChange={setProjects} />
              <ProjectList projects={projects}/>
            </>
          )
            : <Empty text={t('notFoundProjects')} />
        }
      </Content>
    </Layout>
  )
}
