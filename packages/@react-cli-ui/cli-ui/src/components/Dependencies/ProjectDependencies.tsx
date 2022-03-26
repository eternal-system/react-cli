import React, { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import { SettingsContext } from '@context'
import ProjectDependencyItem from './ProjectDependencyItem'

import css from './style.module.less'

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

  const styles = cn(css.wrapper, {
    [css.dark]: darkTheme
  })

  const renderListDepend = useMemo(() => {
    const renderItems = []
    const listDepend = list.filter(p => p.type === 'dependencies')
    if (listDepend.length) renderItems.push(<div key="main-deps" className={css.title}>{t('main')}</div>)
    renderItems.push(listDepend.map(dep => (
      <ProjectDependencyItem key={dep.id} delete={onDelete} {...dep} />
    )))
    return renderItems
  }, [list])

  const renderListDevDepend = useMemo(() => {
    const renderItems = []
    const listDevDepend = list.filter(p => p.type === 'devDependencies')
    if (listDevDepend.length) renderItems.push(<div key="dev-deps" className={css.title}>{t('dev')}</div>)
    renderItems.push(listDevDepend.map(dep => (
      <ProjectDependencyItem key={dep.id} delete={onDelete} {...dep} />
    )))
    return renderItems
  }, [list])

  if (!list.length) {
    return (
      <div className={styles}>
        <div className={css.textEmpty}>{t('notFoundDependencies')}</div>
      </div>
    )
  }

  return (
    <div className={styles}>
      {renderListDepend}
      {renderListDevDepend}
    </div>
  )
}
