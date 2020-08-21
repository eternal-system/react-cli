import React from 'react'
import { useTranslation } from 'react-i18next'

import ProjectListItem from './ProjectListItem'
import css from './style.module.scss'

interface ProjectList {
  active: number | null;
  projects: any[];

  onOpen(id: number): void;
  onOpenEdit(path: string[]): void;
  onDelete(id: number): void;
  onFavorite(id: number): void;
}

export default function ProjectList ({ active, projects, onOpen, onOpenEdit, onDelete, onFavorite }: ProjectList) {
  const { t } = useTranslation('project')

  const listFavorites = projects.filter(p => p.favorite === true)
  const listProjects = projects.filter(p => p.favorite === false)

  return (
    <div className={css.projectList}>
      { listFavorites.length
        ? <div>{t('favoriteProjects')}</div> : null }

      { listFavorites.map(favorite => (
        <ProjectListItem
          key={favorite.id}
          {...favorite}
          active={active}
          onOpen={onOpen}
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
          onOpen={onOpen}
          onOpenEdit={onOpenEdit}
          onFavorite={onFavorite}
          onDelete={onDelete}
        />
      )) }
    </div>
  )
}
