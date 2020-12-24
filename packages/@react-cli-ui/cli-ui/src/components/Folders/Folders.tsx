import React from 'react'
import cn from 'classnames'

import ItemFolder from './ItemFolder'

import css from './style.module.less'

export interface Folder {
  name: string;
  type: 'react' | 'vue' | 'unknown' | 'empty';
}

interface Props {
  folders: Folder[];
  theme: boolean | null;
  onSelect(name: string): void;
}

export default function Folders ({ folders, theme, onSelect }: Props) {
  const styles = cn(css.folders, {
    [css.dark]: theme
  })

  function renderFolderList () {
    return folders.map((folder, i) => (
      <ItemFolder folder={folder} key={i} select={onSelect}/>
    ))
  }

  return (
    <div className={styles}>
      { renderFolderList() }
    </div>
  )
}
