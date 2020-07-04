import React from 'react'

import FolderIcon from '$icons/folder.svg'

import css from './style.module.scss'

// Item Folder
export default function ItemFolder ({ name, select }: any) {
  return (
    <div className={css.folderExplorerItem} onClick={() => select(name)}>
      <div className={css.folderName} >
        <FolderIcon />
        <div className={css.folderNameText}>{name}</div>
      </div>
    </div>
  )
}
