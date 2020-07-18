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

export default function ProjectList ({ favorits, projects, onDelete, onFavorite }: ProjectList) {
    console.log('favorits', favorits)
    console.log('projects', projects)
    const { t } = useTranslation('project')

    return (
        <div className={css.projectList}>
            { favorits.length 
                ? <div>{t('favoriteProjects')}</div> : null }

            { favorits.map(favorite => (
                    <ProjectListItem
                            favorite={true}
                            key={favorite.id}
                            {...favorite}
                            onFavorite={onFavorite}
                            onDelete={onDelete}
                    />
                    )
            )}

            { projects.length && favorits.length 
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
