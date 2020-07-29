import React, { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useContext } from 'react'
import { SettingsContext } from 'context'


import css from './style.module.scss'

import logo from '@public/logo192.png'
import DashboardIcon from '@icons/dashboard-project.svg'
import Arrow from '@icons/arrow-back.svg'
import Home from '@icons/home-filled.svg'

export default function WelcomeTips() {
    const { t } = useTranslation('welcometips')
  const { locale } = useContext(SettingsContext)


    const menu = [
        { key: 1, label: t('tip1'), Icon: DashboardIcon },
        { key: 2, label: t('tip2'), Icon: Arrow },
        { key: 3, label: t('tip3'), Icon: Home }
    ]

      const renderChildren = useMemo(() => menu.map(({ key, label, Icon }) => {
        return (
          <li key={key}>
            <span><Icon /></span>
            <span>{ label }</span>
          </li> 
        )
      }), [locale])

    return(
        <div className={css.wrapper}>
            <p className={css.blot}>{t('blot')}</p>
            <div className={css.content}>
                <img src={logo} className={css.logo} />
                <h1>{t('welcome')}</h1>
                <ul className={css.list}>
                    {renderChildren}
                </ul>
            </div>
        </div>
    )
}