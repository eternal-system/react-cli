import React from 'react'
import { useTranslation } from 'react-i18next'

import LinkIcon from '@icons/link.svg'

import css from './style.module.scss'

export default function ItemPackages ({pkg}: any) {
  console.log(pkg)
  const { t } = useTranslation('dependencies')
  return (
    <div className={css.item}>
      <div className={css.icon}>
       {pkg.links.repository && <img src={`https://github.com/${pkg.links.repository.split('/',4)[3]}.png`} alt=""/>}
      </div>
      <div className={css.info}>
        <div className={css.name}>
          <span>{pkg.name}</span>
          <span>{pkg.version}</span>
        </div>
        <div className={css.description}>
          <span>{pkg.description}</span>
          <span className={css.link}>
            <a href={pkg.links.repository} target="_blank" rel="noreferrer">
              <LinkIcon/> {t('moreInfo')}
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}