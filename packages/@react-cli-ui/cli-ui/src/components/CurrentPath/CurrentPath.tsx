import React from 'react'

import FolderIcon from '@icons/folder-filled.svg'

import css from './style.module.scss'

export default function CurrentPath ({url}: string[]) {
  return (
    <div className={css.path}>
      <div className={css.icon}>
        <FolderIcon />
      </div>
      {url && `/${url.join('/')}`}
    </div>
  )
}
