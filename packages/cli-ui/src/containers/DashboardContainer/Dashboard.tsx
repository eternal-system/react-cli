import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import ReactTooltip from 'react-tooltip'

import { Routes } from 'router'

import DashboardIcon from '@icons/dashboard-project.svg'
import ActiveIcon from '@icons/dashboard-tasks.svg'
import StatsIcon from '@icons/dashboard-config.svg'

import { uuid } from 'utils'
import useDashboardContainer, { MenuItems } from './dashboardContainer.hook'

import css from './style.module.scss'

const TOOLTIP_ID = uuid()

export default function Dashboard () {
  const { t } = useTranslation('dashboard')
  const { locale, activeTab } = useDashboardContainer()

  const menu: MenuItems[] = [
    { key: Routes.DASHBOARD, label: t('dashboard'), Icon: DashboardIcon },
    { key: Routes.DEPENDENCIES, label: t('dependencies'), Icon: StatsIcon },
    { key: Routes.DASHBOARD_TASKS, label: t('tasks'), Icon: ActiveIcon }
  ]

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
