import React from 'react'
import { Project } from '../../pages/Projects'
import ProjectListItem from './ProjectListItem'
import { useTranslation } from 'react-i18next'
import css from './style.module.scss'

interface ProjectList {
      projects: Project[];
      favorits: Project[];
      onDelete(id: number, favorite: boolean): void;
      onFavorite(id: number, favorite: boolean): void;
}

export default function ProjectList ({ favorites, projects, onDelete, onFavorite }: ProjectList) {
    console.log('favorits', favorites)
    console.log('projects', projectes)
    const { t } = useTranslation('project')

    return (
        <div className={css.projectList}>
            { favorites.length 
                ? <div>{t('favoriteProjects')}</div> : null }

            { favorites.map(favorite => (
                    <ProjectListItem
                            favorite={true}
                            key={favorite.id}
                            {...favorite}
                            onFavorite={onFavorite}
                            onDelete={onDelete}
                    />
                    )
            )}

            { projects.length && favorites.length 
                ? <div>{t('otherProjects')}</div> : null }

            { projects.map(project => (
                    <ProjectListItem
                        favorite={false}
                        key={project.id}
                        {...project}
                        onFavorite={onFavorite}
                        onDelete={onDelete}
                    />
            )) }
        </div>
    )
}
