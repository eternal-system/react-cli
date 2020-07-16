import React from 'react'
import css from './style.module.scss'

export default function ProjectListItem ({name, path}) {
  return (
    <div className={css.content}>
      <div className={css.info}>
        <div className={css.name}>{name}</div>
        <div className={css.path}>{ typeof path === "object" ? `/${path.join('/')}` : `/${path}`}</div>
      </div>
    </div>
  )
}
