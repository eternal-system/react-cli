import React from 'react'

import css from './style.module.scss'

interface IProps {
  task: {name: string, value: string | any };
}

export default function ItemTask ({ task }: IProps) {
  const { name, value } = task
  return (
    <div className={css.taskElement}>
      <span className={css.name}>{name}</span>
      <span className={css.text}>{value}</span>
    </div>
  )
}
