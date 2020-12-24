import React from 'react'

import ItemTask from './ItemTask'

import css from './style.module.less'

interface Props {
  tasks: any;
}

export default function Tasks ({ tasks }: Props) {
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
