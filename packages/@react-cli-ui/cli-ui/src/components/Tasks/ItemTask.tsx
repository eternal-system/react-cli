import React from 'react'

import css from './style.module.less'

interface Props {
  task: {name: string, value: string | any };
}

export default function ItemTask ({ task }: Props) {
  const { name, value } = task
  return (
    <div className={css.taskElement}>
      <span className={css.name}>{name}</span>
      <span className={css.text}>{value}</span>
    </div>
  )
}
