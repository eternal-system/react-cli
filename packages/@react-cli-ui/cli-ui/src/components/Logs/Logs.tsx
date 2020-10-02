import React from 'react'

import ComputerIcon from '@icons/computer.svg'

import css from './style.module.scss'

export default function Logs () {
  return (
    <div className={css.logger}>
      <div className={css.header}>
        <div className={css.icon}><ComputerIcon /></div>
        title
      </div>
      <div className={css.content}>
        list
      </div>
    </div>
  )
}
