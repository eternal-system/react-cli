import React, { useState, useEffect, useContext } from 'react'
import { unstable_batchedUpdates as batch } from 'react-dom'
import { useHistory } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

import { Layout, Content, Empty, ProjectFilter, ProjectList, Loader } from '@components'
import { useNotification } from '@hooks'

import AddIcon from '@icons/add.svg'
import ProjectIcon from '@icons/nav-projects.svg'
import CloudIcon from '@icons/dashboard-tasks.svg'
import ComputerIcon from '@icons/computer.svg'

import { SettingsContext } from '../context'
import { Routes } from '../router'

export interface ProjectProps {
  id: string;
  manager: string;
  name: string;
  path: string[];
  preset: string;
  favorite: boolean;
}

function getKey (key: string) {
  if (key === 'start') {
    return Routes.DASHBOARD_TASKS_START
  } else if (key === 'build') {
    return Routes.DASHBOARD_TASKS_BUILD
  } else if (key === 'test') {
    return Routes.DASHBOARD_TASKS_TEST
  } else if (key === 'eject') {
    return Routes.DASHBOARD_TASKS_EJECT
  } else {
    return Routes.DASHBOARD_TASKS
  }
}

function getIcon (key: string) {
  if (key === 'start') {
    return ComputerIcon
  } else if (key === 'build') {
    return CloudIcon
  } else if (key === 'test') {
    return ProjectIcon
  } else if (key === 'eject') {
    return AddIcon
  } else {
    return ProjectIcon
  }
}

export default function Projects () {
  const history = useHistory()
  const { t } = useTranslation('project')
  const notification = useNotification()
  const { socket, changeSelectedPath, darkTheme } = useContext(SettingsContext)

  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [filters, setFilters] = useState<ProjectProps[]>([])
  const [loading, setLoading] = useState(false)
  const [tasks, setTask] = useState<any[]>([])
  const [active, setActive] = useState(null)

  useEffect(() => {
    socket.send({
      type: 'GET_PROJECTS'
    })

    socket.send({
      type: 'GET_CONFIG'
    })

    socket.on('projects', (res: any) => {
      batch(() => {
        setLoading(true)
        setProjects(res.data)
        setFilters(res.data)
        setTimeout(() => {
          setLoading(false)
        }, 300)
      })
    })

    socket.on('tasks', (res: any) => {
      const data = Object.entries(res.data)
      const list = []
      for (const [key, value] of data) {
        list.push({ name: key, label: value, key: getKey(key), Icon: getIcon(key) })
      }
      setTask(list)
    })

    socket.on('config', (res: any) => {
      setActive(res.data?.lastOpenProject || 1)
    })

    socket.on('erro', (error: any) => {
      setLoading(false)
      notification.error({
        title: error.title,
        message: error.message
      })
    })

    return () => {
      socket.off('projects')
      socket.off('config')
      socket.off('tasks')
      socket.off('erro')
    }
  }, [])

  function openProject (id: string) {
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

  function handleListTasks (id: string) {
    if (id) {
      socket.send({
        type: 'GET_LIST_TASKS',
        id
      })
    }
  }

  function handleOpenEdit (path: string[]) {
    if (path.length) {
      socket.send({
        type: 'OPEN_EDIT_FILE',
        path
      })
    }
  }

  function handleFavorite (id: string) {
    if (id) {
      socket.send({
        type: 'ADD_FAVORITE_BY_ID',
        id
      })
    }
  }

  function handleDelete (id: string): void {
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
            tasks={tasks}
            onTask={handleListTasks}
            active={active}
            projects={filters}
            theme={darkTheme}
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
