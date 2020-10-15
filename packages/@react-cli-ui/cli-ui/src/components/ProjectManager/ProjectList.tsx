import React from 'react'
import { useTranslation } from 'react-i18next'

import ProjectListItem from './ProjectListItem'
import cn from 'classnames'
import css from './style.module.scss'

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

export default function ProjectList ({ active, projects, theme, tasks, onTask, onOpen, onOpenEdit, onDelete, onFavorite }: ProjectList) {
  const { t } = useTranslation('project')
  const styles = cn(theme ? css.dark : css.ligth, css.projectList)
  const listFavorites = projects.filter(p => p.favorite === true)
  const listProjects = projects.filter(p => p.favorite === false)

  return (
    <div className={styles}>
      { listFavorites.length
        ? <div>{t('favoriteProjects')}</div> : null }

      { listFavorites.map(favorite => (
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
      )
      )}

      { listProjects.length && listFavorites.length
        ? <div>{t('otherProjects')}</div> : null }

      { listProjects.map(project => (
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
      )) }
    </div>
  )
}
