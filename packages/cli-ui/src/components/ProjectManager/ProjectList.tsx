import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Project } from '../../pages/Projects'
import ProjectListItem from './ProjectListItem'
import css from './style.module.scss'

interface ProjectList {
      projects: Project[];
      onDelete(id: number, favorite: boolean): void;
      onFavorite(id: number, favorite: boolean): void;
}

export default function ProjectList ({ projects, onDelete, onFavorite }: ProjectList) {
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
                        onFavorite={onFavorite}
                        onDelete={onDelete}
                    />
                )
            )} 

            { listProjects.length  
                ? <div>{t('otherProjects')}</div> : null }

            { listProjects.map(project => (
                <ProjectListItem
                    key={project.id}
                    {...project}
                    onFavorite={onFavorite}
                    onDelete={onDelete}
                />
            )) }
        </div>
    )
}
