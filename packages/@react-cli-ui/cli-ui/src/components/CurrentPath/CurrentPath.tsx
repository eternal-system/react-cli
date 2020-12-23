import React from 'react'

import FolderIcon from '@icons/folder-filled.svg'
import cn from 'classnames'

import css from './style.module.less'

interface IProps {
  url: string[];
  theme: boolean | null;
}

export default function CurrentPath ({ url, theme }: IProps) {
  // theme
  const styles = cn(theme ? css.dark : css.ligth, css.path)
  return (
    <div className={styles}>
      <div className={css.icon}>
        <FolderIcon />
      </div>
      {url && `/${url.join('/')}`}
    </div>
  )
}
