import React from 'react'

import ItemFolder from './ItemFolder'
import cn from 'classnames'

import css from './style.module.less'

interface Props {
  /** @TODO add to real types */
  folders: string[];
  onSelect(name: string): void;
  theme: boolean | null;
}

export default function Folders ({ folders, theme, onSelect }: Props) {
  const styles = cn(theme ? css.dark : css.ligth, css.folders)
  function renderFolderList () {
    return folders.map((folder, i) => {
      return (
        <ItemFolder folder={folder} key={i} select={onSelect}/>
      )
    })
  }

  return (
    <div className={styles}>
      { renderFolderList() }
    </div>
  )
}
