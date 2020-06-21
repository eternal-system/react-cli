import React, { useMemo } from 'react'
import cn from 'classnames'

import Footer from 'components/Footer'
import useProjectContainer from './projectContainer.hook'
import logo from '../../../public/logo192.png'
import css from './style.module.css'
import { Routes } from 'router'

export default function App () {
  const { tabs, activeTab, handleSetTab } = useProjectContainer()

  const renderChildren = useMemo(() => tabs.map((tab) => {
    const styledTab = cn({
      [css.active]: tab.key === activeTab ||
        (
          tab.key === Routes.PROJECT_SELECT &&
          Routes.PROJECT_CREATE === activeTab
        )
    })
    return (
      <span
        key={tab.key}
        className={styledTab}
        onClick={() => handleSetTab(tab)}
      >
        { tab.label }
      </span>
    )
  }), [activeTab])

  return (
    <>
      <header className={css.wrapperHeader} >
        <div className={css.wrapperLayout} >
          <div className={css.wrapperLogo}>
            <a href="/" >
              <img src={logo} alt="logo" />
              <span>React Project Manager</span>
            </a>
          </div>
          <div className={css.nav}>
            {renderChildren}
          </div>
        </div>
      </header>
      <Footer />
    </>
  )
}
