import React from 'react'
import { Project } from '../../pages/Projects'
import SearchIcon from '$icons/search.svg'

import css from './style.module.scss'

interface Props {
      onChange?: any;
}

export default function ProjectFilter ({ onChange }: Props) {
  return (
    <div className={css.filter}>
      <div className={css.filter.filter}>
        <SearchIcon />
        <input
          className={css.input}
          onChange={onChange}
          type="text"
        />
      </div>
    </div>
  )
}
