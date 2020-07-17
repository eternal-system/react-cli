import React from 'react'
import { Project } from '../../pages/Projects'
import ProjectListItem from './ProjectListItem'
import css from './style.module.scss'

interface ProjectList {
      projects: Project[]
}

export default function ProjectList ({ projects }: ProjectList) {
  return (
    <div className={css.projectList}>
      {projects.map(project => (
        <ProjectListItem key={project.id} {...project}/>
      ))}
    </div>
  )
}
