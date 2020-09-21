import React from 'react'

import ItemFolder from './ItemFolder'

import css from './style.module.scss'

interface Props {
  /** @TODO add to real types */
  folders: string[];
  onSelect(name: string): void;
}

export default function Folders ({ folders, onSelect }: Props) {
  function renderFolderList () {
    return folders.map((folder, i) => {
      return (
        <ItemFolder folder={folder} key={i} select={onSelect}/>
      )
    })
  }

  return (
    <div className={css.folders}>
      { renderFolderList() }
    </div>
  )
}
