import React from 'react'
import { Project } from '../../pages/Projects'
import css from './style.module.scss'

interface Props {
      projects: Project[];
      onChange?: any;
}

export default function ProjectFilter ({ projects, onChange }: Props) {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value
    const filter = projects.filter(project => project.name.indexOf(searchValue) !== -1 )
    onChange(filter)
  }

  return (
    <div className={css.filter}>
        <div className={css.filter.filter}>
          <input 
            className={css.input}
            onChange={handleChange}
            placeholder="Filter"
            type="text"
          />
         </div>
    </div>
  )
}
