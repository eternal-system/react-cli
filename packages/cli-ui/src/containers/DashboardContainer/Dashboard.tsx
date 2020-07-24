import React, { useMemo } from 'react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Routes } from 'router'
import useDashboardContainer, { MenuItems } from './dashboardContainer.hook'

import css from './style.module.scss'

import DashboardIcon from '$icons/dashboard-project.svg'
import ActiveIcon from '$icons/dashboard-tasks.svg'
import StatsIcon from '$icons/dashboard-config.svg'

export default function Dashboard () {
  const { t } = useTranslation('dashboard')
  const { locale, activeTab } = useDashboardContainer()

  const menu: MenuItems[] = [
    { key: Routes.DASHBOARD, label: t('dashboard'), Icon: DashboardIcon },
    { key: Routes.DASHBOARD_ACTIVE, label: t('active'), Icon: ActiveIcon },
    { key: Routes.DASHBOARD_STATS, label: t('stats'), Icon: StatsIcon }
  ]

  const renderChildren = useMemo(() => menu.map(({ key, label, Icon }: MenuItems) => {
    return (
      <NavLink
        key={key}
        exact={true}
        to={key}
        activeClassName={css.active}
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
    </div>
  )
}
