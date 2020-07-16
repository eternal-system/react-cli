import React from 'react'
import { Project } from '../../pages/Projects'
import css from './style.module.scss'
import { Input } from 'common'

interface ProjectFilter {
      projects: Project[]
}

export default function ProjectFilter ({ projects }) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value)
  }

  return (
    <div className={css.filter}>
        <div className={css.filter.filter}>
          <input 
            className={css.input}
            onChenge={handleChange}
            type="text"
          />
         </div>
    </div>
  )
}
