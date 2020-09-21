import React from 'react'
import ItemTask from './ItemTask'

import css from './style.module.scss'

interface IProps {
  tasks: any;
}

export default function Tasks ({ tasks }: IProps) {
  function renderTaskList () {
    const data = Object.entries(tasks)
    const list = []
    for (const [key, value] of data) {
      list.push({ name: key, value })
    }
    return list.map((task, i) => {
      return (
        <ItemTask task={task} key={i} />
      )
    })
  }

  return (
    <div className={css.nav}>
      { renderTaskList() }
    </div>
  )
}
