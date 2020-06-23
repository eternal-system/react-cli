import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

import { CheckBoxTheme, Footer } from 'components'
import { NavLink } from 'react-router-dom'
import useProjectContainer from './projectContainer.hook'
import { Routes } from 'router'

import logo from '../../../public/logo192.png'
import css from './style.module.css'

export default function ProjectContainer () {
  const { t } = useTranslation('project')
  const { locale, tabs, activeTab, isDarkTheme } = useProjectContainer()

  const renderChildren = useMemo(() => tabs.map((tab) => {
    return (
      <NavLink
        key={tab.key}
        exact={true}
        to={tab.key}
        activeClassName={css.active}
        isActive={(_, location) => {
          if (tab.key === Routes.PROJECT_SELECT &&
            Routes.PROJECT_CREATE === location.pathname
          ) {
            return true
          }

          if (tab.key === location.pathname) {
            return true
          }
          return false
        }}
      >
        {tab.label}
      </NavLink>
    )
  }), [activeTab, locale])

  return (
    <>
      <header className={css.wrapperHeader} >
        <div className={css.wrapperLayout} >
          <div className={css.wrapperLogo}>
            <a href="/" >
              <img src={logo} alt="logo" />
              <span>{t('headerTitle')}</span>
            </a>
          </div>
          <div className={css.nav}>
            {renderChildren}
          </div>
        </div>

        <div className="checktheme" >
          <p className={isDarkTheme}>Dark Mode</p>
          <CheckBoxTheme />
        </div>

      </header>

      <Footer />
    </>
  )
}
