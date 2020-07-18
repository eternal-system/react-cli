import React from 'react'
import { Project } from '../../pages/Projects'
import ProjectListItem from './ProjectListItem'
import css from './style.module.scss'

interface ProjectList {
      projects: Project[];
      favorits: Project[];
      onDelete(id: number): void;
      onFavorite(id: number): void;
}

export default function ProjectList ({ favorits, projects, onDelete, onFavorite }: ProjectList) {
    console.log('favorits', favorits)
    console.log('projects', projects)
  return (
    <div className={css.projectList}>
        { favorits.length 
            ? "Favorit projects" : null }

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
            ? "Other projects" : null }

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
