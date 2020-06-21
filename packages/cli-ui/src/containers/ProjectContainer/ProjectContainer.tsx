import React, { useMemo } from 'react'

import Footer from 'components/Footer'
import useProjectContainer from './projectContainer.hook'
import logo from '../../../public/logo192.png'
import css from './style.module.css'

export default function App () {
  const { tabs, activeTab, handleSetTab } = useProjectContainer()

  const renderChildren = useMemo(() => tabs.map((tab) => {
    return (
      <span
        key={tab.key}
        className={tab.key === activeTab ? css.active : ''}
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
