import React from 'react'
import { Project } from '../../pages/Projects'
import SearchIcon from '$icons/search.svg'

import css from './style.module.scss'

interface Props {
      projects: Project[];
      onChange?: any;
}

export default function ProjectFilter ({ projects, onChange }: Props) {
  function handleChange (event: React.ChangeEvent<HTMLInputElement>) {
    const searchValue = event.target.value
    const filter = projects.filter(project => project.name.indexOf(searchValue) !== -1)
    onChange(filter)
  }

  return (
    <div className={css.filter}>
      <div className={css.filter.filter}>
        <SearchIcon />
        <input
          className={css.input}
          onChange={handleChange}
          type="text"
        />
      </div>
    </div>
  )
}
