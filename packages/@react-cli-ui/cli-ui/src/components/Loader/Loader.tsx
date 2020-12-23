import React from 'react'

import LoaderIcon from '@icons/react-logo.svg'

import css from './style.module.less'

export default function Loader () {
  return (
    <div className={css.loading}>
      <LoaderIcon />
    </div>
  )
}
