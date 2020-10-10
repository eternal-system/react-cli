import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { SettingsContext } from 'context'
import ProjectDependencyItem from './ProjectDependencyItem'
import cn from 'classnames'
import css from './style.module.scss'

interface PropsItem {
  baseFir: string;
  id: string;
  installed: boolean;
  type: string;
  versionRange: string;
  website: string;
}

interface PropsDepend {
  list: PropsItem[];
  onDelete: (name: string) => void
}

export default function ProjectDependencies ({ list, onDelete }: PropsDepend) {
  const { t } = useTranslation('dependencies')
  const { darkTheme } = useContext(SettingsContext)
  const styles = cn(darkTheme ? css.dark : css.ligth, css.wrapper)

  const listDepend = list.filter(p => p.type === 'dependencies')
  const listDevDepend = list.filter(p => p.type === 'devDependencies')

  return (
    <div className={styles}>
      {!!listDepend.length && <div className={css.title}>{t('main')}</div>}
      {listDepend.map(dep => (
        <ProjectDependencyItem
          key={dep.id}
          delete={onDelete}
          {...dep}
        />
      ))}
      {Boolean(listDevDepend.length) && <div className={css.title}>{t('dev')}</div>}
      {listDevDepend.map(dep => (
        <ProjectDependencyItem
          key={dep.id}
          delete={onDelete}
          {...dep}
        />
      ))}
    </div>
  )
}
