import React, { useState, useEffect, useMemo, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'
import { v4 as uuid } from 'uuid'

import { Routes } from 'router'
import { useNotification } from '@hooks'
import { DropdownProject } from '@components'
import DashboardIcon from '@icons/dashboard-project.svg'
import ActiveIcon from '@icons/dashboard-tasks.svg'
import { SettingsContext } from '../../context'
import StatsIcon from '@icons/dashboard-config.svg'

import useDashboardContainer, { MenuItems } from './dashboardContainer.hook'

import css from './style.module.scss'

const TOOLTIP_ID = uuid()

export interface ProjectProps {
  id: number;
  manager: string;
  name: string;
  path: string;
  preset: string;
  favorite: boolean;
}

export default function Dashboard () {
  const { t } = useTranslation('dashboard')
  const { locale, activeTab } = useDashboardContainer()
  const notification = useNotification()
  const { socket, selectedPath } = useContext(SettingsContext)

  const [projects, setProjects] = useState<ProjectProps[]>([])
  const [active, setActive] = useState(null)
  const [title, setTitle] = useState<string>('')

  useEffect(() => {
    socket.send({
      type: 'GET_CONFIG'
    })

    socket.send({
      type: 'GET_PROJECTS'
    })

    socket.on('config', (res: any) => {
      setActive(res.data?.lastOpenProject || 1)
    })

    socket.on('projects', (res: any) => {
      setProjects(res.data)
    })

    socket.on('erro', (error: any) => {
      notification.error({
        title: error.message,
        message: error.error.path
      })
    })

    return () => {
      socket.off('config')
      socket.off('projects')
      socket.off('erro')
    }
  }, [])

  useEffect(() => {
    const title = !!projects.length && projects.find(p => p.id === active)
    setTitle(title ? title.name : '')
  }, [active, projects])

  const menu: MenuItems[] = [
    { key: Routes.DASHBOARD, label: t('dashboard'), Icon: DashboardIcon },
    { key: Routes.DEPENDENCIES, label: t('dependencies'), Icon: StatsIcon },
    { key: Routes.DASHBOARD_TASKS, label: t('tasks'), Icon: ActiveIcon }
  ]

  function handleOpenEdit () {
    socket.send({
      type: 'OPEN_EDIT_FILE',
      path: selectedPath
    })
  }

  const renderChildren = useMemo(() => menu.map(({ key, label, Icon }: MenuItems) => {
    return (
      <NavLink
        key={key}
        to={key}
        exact={true}
        activeClassName={css.active}
        data-tip={`<div class="${css.tooltip}">${label}</div>`}
        data-for={TOOLTIP_ID}
        isActive={(_, location) => {
          if (key === location.pathname) {
            return true
          }
          return false
        }}
      >
        <Icon />
        <span className={css.disableTitle}>{ label }</span>
      </NavLink>
    )
  }), [activeTab, locale])

  return (
    <div className={css.wrapperHeader}>
      <div className={css.wrapperLayout}>
        <DropdownProject
          title={title}
          data={[]}
          openEdit={handleOpenEdit}
          edit={() => console.log('edit')}
        />
        <div className={css.nav}>
          {renderChildren}
        </div>
      </div>
      <ReactTooltip
        id={TOOLTIP_ID}
        place="right"
        effect="solid"
        delayShow={1000}
        offset={{ left: 30 }}
        html
      />
    </div>
  )
}
