import React from 'react'

// import css from './style.module.scss'

interface IProps {
  task: {name: string, value: string | any };
}

export default function ItemTask ({ task }: IProps) {
  return (
    <div>{task.name} {task.value}</div>
  )
}
