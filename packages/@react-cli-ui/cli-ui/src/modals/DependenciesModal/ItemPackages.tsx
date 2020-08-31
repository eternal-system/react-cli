import React from 'react'
import { useTranslation } from 'react-i18next'

import LinkIcon from '@icons/link.svg'

import css from './style.module.scss'

interface ItemProps {
  // TODO add type
  pkg: any;
  active: string | null; 
  change(activ: string | null): void;
}

export default function ItemPackages ({pkg, active, change}: any) {
  // console.log(pkg)
  const { t } = useTranslation('dependencies')

  function handleClick (name: string) {
    change(name)
  }

  return (
    <div className={`${css.item} ${active === pkg.name ? css.active : ''}`} onClick={() => handleClick(pkg.name)} >
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
