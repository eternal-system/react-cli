import React from 'react'
import { Project } from '../../pages/Projects'

interface ProjectFilter {
      projects: Project[]
}

export default function ProjectFilter ({ projects }) {
  return (
    <div className="project__filter">
          Filter
    </div>
  )
}
