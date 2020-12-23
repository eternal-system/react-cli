import React from 'react'
import { useTranslation } from 'react-i18next'

import LinkIcon from '@icons/link.svg'

import css from './style.module.less'

interface ItemProps {
  // TODO add type
  pkg: any;
  active: string | null;
  change(active: string | null): void;
}

export default function ItemPackages ({ pkg, active, change }: any) {
  // console.log(pkg)
  const { t } = useTranslation('dependencies')
  const { name, links, description, version } = pkg
  const { repository } = links

  function handleClick (name: string) {
    change(name)
  }

  return (
    <div className={`${css.item} ${active === name ? css.active : ''}`} onClick={() => handleClick(name)} >
      <div className={css.icon}>
        {repository && <img src={`https://github.com/${repository.split('/', 4)[3]}.png`} alt=""/>}
      </div>
      <div className={css.info}>
        <div className={css.name}>
          <span>{name}</span>
          <span>{version}</span>
        </div>
        <div className={css.description}>
          <span>{description}</span>
          <span className={css.link}>
            <a href={repository} target="_blank" rel="noreferrer">
              <LinkIcon/> {t('moreInfo')}
            </a>
          </span>
        </div>
      </div>
    </div>
  )
}
