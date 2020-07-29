import React from 'react'
import { useTranslation } from 'react-i18next'

import LinkIcon from '@icons/link.svg'
import LikeIcon from '@icons/like.svg'
import css from './style.module.scss'

interface PropsItem {
  baseFir: string;
  id: string;
  installed: boolean;
  type: string;
  versionRange: string;
  website: string;
}

export default function ProjectDependencyItem (item: PropsItem) {
  const { t } = useTranslation('dependencies')
  return (
    <div className={css.content}>
      <div className={css.itemLogo}>
        <img src={`https://avatars.dicebear.com/v2/identicon/${item.id}.svg`} alt=""/>
      </div>
      <div className={css.listItemInfo}>
        <div className={css.name}>{item.id}</div>
        <div className={css.description}>
          <div className={css.info}>
            {t('version')}: {item.versionRange}
          </div>
          <div className={css.info}>
           { item.installed 
              ? <div className={css.like}><LikeIcon /> {t('installed')}</div> 
              : <div>{t('noInstalled')}</div>}
          </div>
          <div className={css.info}>
            <a href={item.website} target="_blank">
              <LinkIcon/> {t('moreInfo')}
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
