import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from '../../pages/Projects'
import ProjectListItem from './ProjectListItem'
import css from './style.module.scss'

interface ProjectList {
      projects: Project[];
      active: number;
      onOpen(id: number): void;
      onDelete(id: number): void;
      onFavorite(id: number): void;
}

export default function ProjectList ({ active, projects, onOpen, onDelete, onFavorite }: ProjectList) {
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
                    onFavorite={onFavorite}
                    onDelete={onDelete}
                />
            )) }
        </div>
    )
}
