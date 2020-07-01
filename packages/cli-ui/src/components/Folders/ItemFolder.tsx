import React from 'react'

import css from './style.module.scss'

// Item Folder
export default function ItemFolder ({ name, select }: any) {
  return (
    <div className={css.folderExplorerItem} onClick={() => select(name)}>
      <div className={css.folderName} >
        {name}
      </div>
    </div>
  )
}
