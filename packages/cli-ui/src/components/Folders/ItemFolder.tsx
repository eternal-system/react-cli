import React from 'react'

import ReactLogoIcon from '@icons/react-logo.svg'
import VueLogoIcon from '@icons/vue-logo.svg'
import FolderIcon from '@icons/folder.svg'
import FolderFilledIcon from '@icons/folder-filled.svg'

import css from './style.module.scss'

// Item Folder
export default function ItemFolder ({ folder, select }: any) {
  function renderFolderIcon () {
    if (folder.type === 'empty') return <FolderIcon />
    return <FolderFilledIcon />
  }

  function renderProjectIcon () {
    switch (folder.type) {
      case 'react':
        return <ReactLogoIcon className={css.reactIcon} />
      case 'vue':
        return <VueLogoIcon />
      default:
        return null
    }
  }

  return (
    <div className={css.folderExplorerItem} onClick={() => select(folder.name)}>
      <div className={css.folderName} >
        {renderFolderIcon()}
        <div className={css.folderNameText}>
          {folder.name}
          {renderProjectIcon()}
        </div>
      </div>
    </div>
  )
}
