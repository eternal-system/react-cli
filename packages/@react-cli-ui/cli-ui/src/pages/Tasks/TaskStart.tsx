import React from 'react'
import { DashboardWrap } from '@components'

import PlayIcon from '@icons/play.svg'
import css from './style.module.scss'

export default function TaskStart () {
  return (
    <DashboardWrap>
      <div className={css.panel}>
        <button onClick={() => console.log('start')}>
          <PlayIcon /> <span>Run</span>
        </button>
      </div>
    </DashboardWrap>
  )
}
