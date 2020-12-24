import React from 'react'
import { useTranslation } from 'react-i18next'
import cn from 'classnames'

import ProjectListItem from './ProjectListItem'
import css from './style.module.less'

interface ProjectList {
  active: string | null;
  projects: any[];
  theme: boolean | null;
  tasks: any[];
  onTask(id: string | null): void;
  onOpen(id: string): void;
  onOpenEdit(path: string[]): void;
  onDelete(id: string): void;
  onFavorite(id: string): void;
}

export default function ProjectList ({
  active,
  projects,
  theme,
  tasks,
  onTask,
  onOpen,
  onOpenEdit,
  onDelete,
  onFavorite
}: ProjectList) {
  const { t } = useTranslation('project')
  const listFavorites = projects.filter(p => p.favorite)
  const listProjects = projects.filter(p => !p.favorite)
  const styles = cn(css.projectList, {
    [css.dark]: theme
  })

  function renderFavoriteList () {
    return listFavorites.map(favorite => (
      <ProjectListItem
        key={favorite.id}
        {...favorite}
        active={active}
        tasks={tasks}
        onOpen={onOpen}
        onTask={onTask}
        onOpenEdit={onOpenEdit}
        onFavorite={onFavorite}
        onDelete={onDelete}
      />
    ))
  }
  function renderProjectList () {
    return listProjects.map(project => (
      <ProjectListItem
        key={project.id}
        {...project}
        active={active}
        tasks={tasks}
        onTask={onTask}
        onOpen={onOpen}
        onOpenEdit={onOpenEdit}
        onFavorite={onFavorite}
        onDelete={onDelete}
      />
    ))
  }

  return (
    <div className={styles}>
      {!!listFavorites.length && <div>{t('favoriteProjects')}</div>}
      {renderFavoriteList()}
      {!!listProjects.length && !!listFavorites.length && <div>{t('otherProjects')}</div>}
      {renderProjectList()}
    </div>
  )
}
