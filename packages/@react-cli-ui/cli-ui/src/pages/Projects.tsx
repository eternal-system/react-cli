import React, { useState, useEffect, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { useHistory } from 'react-router-dom'

import { Layout, Content, Empty, ProjectFilter, ProjectList, Loader } from '@components'
import { useNotification } from '@hooks'
import { SettingsContext } from '../context'
import { Routes } from '../router'

export interface ProjectProps {
  id: number;
  manager: string;
  name: string;
  path: string;
  preset: string;
  favorite: boolean;
}

export default function Projects () {
  const history = useHistory()
  const { t } = useTranslation('project')
  const notification = useNotification()
  const { socket, changeSelectedPath } = useContext(SettingsContext)

  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [filters, setFilters] = useState<ProjectProps[]>([])
  const [loading, setLoading] = useState(false)
  const [active, setActive] = useState(null)

  useEffect(() => {
    socket.send({
      type: 'GET_PROJECTS'
    })

    socket.send({
      type: 'GET_CONFIG'
    })

    socket.on('projects', (res) => {
      batch(() => {
        setLoading(true)
        setProjects(res.data)
        setFilters(res.data)
        setTimeout(() => {
          setLoading(false)
        }, 300)
      })
    })

    socket.on('config', (res) => {
      setActive(res.data?.lastOpenProject || 1)
    })

    socket.on('erro', (error) => {
      setLoading(true)
      notification.error({
        title: error.message,
        message: error.error.path
      })
    })

    return () => {
      socket.off('projects')
      socket.off('config')
      socket.off('erro')
    }
  }, [])

  function openProject (id: number) {
    if (id) {
      socket.send({
        type: 'OPEN_PROJECT',
        id
      })
      const project = projects.find(project => project.id === id)
      changeSelectedPath(project.path)
      history.push(Routes.DASHBOARD)
    }
  }

  function handleOpenEdit (path: string[]) {
    console.log(path)
  }

  function handleFavorite (id: number) {
    if (id) {
      socket.send({
        type: 'ADD_FAVORITE_BY_ID',
        id
      })
    }
  }

  function handleDelete (id: number): void {
    if (id) {
      socket.send({
        type: 'DELETE_PROJECT_BY_ID',
        id
      })
    }
  }

  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value
    const filter = projects.filter(project => project.name.indexOf(searchValue) !== -1)
    setFilters(filter)
  }

  if (loading) {
    return (
      <Layout>
        <Content>
          <Loader />
        </Content>
      </Layout>
    )
  }

  return (
    <Layout>
      <Content>
        { projects.length ? <ProjectFilter onChange={handleChange} /> : null}
        { filters.length
          ? <ProjectList
            active={active}
            projects={filters}
            onOpen={openProject}
            onOpenEdit={handleOpenEdit}
            onFavorite={handleFavorite}
            onDelete={handleDelete}
          />
          : <Empty text={t('notFoundProjects')} /> }
      </Content>
    </Layout>
  )
}
