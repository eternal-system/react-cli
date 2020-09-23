import React from 'react'

import FolderIcon from '@icons/folder-filled.svg'

import css from './style.module.scss'

interface IProps {
  url: string[]
}

export default function CurrentPath ({ url }: IProps) {
  return (
    <div className={css.path}>
      <div className={css.icon}>
        <FolderIcon />
      </div>
      {url && `/${url.join('/')}`}
    </div>
  )
}
