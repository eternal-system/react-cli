import React, { useMemo, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import { SettingsContext } from 'context'
import DashboardIcon from '@icons/dashboard-project.svg'
import ReactLogoIcon from '@icons/react-logo.svg'
import Arrow from '@icons/arrow-back.svg'
import Home from '@icons/home-filled.svg'

import css from './style.module.less'

export default function WelcomeTips () {
  const { t } = useTranslation('welcometips')
  const { locale, darkTheme } = useContext(SettingsContext)

  const styles = cn(css.wrapper, {
    [css.dark]: darkTheme
  })

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

  return (
    <div className={styles}>
      <p className={css.blot}>{t('blot')}</p>
      <div className={css.content}>
        <ReactLogoIcon className={css.logo} />
        <h1>{t('welcome')}</h1>
        <ul className={css.list}>
          {renderChildren}
        </ul>
      </div>
    </div>
  )
}
