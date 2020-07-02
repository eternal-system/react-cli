import React from 'react'

import ItemFolder from './ItemFolder'

import css from './style.module.scss'

interface Props {
  /** @TODO add to real types */
  folders: string[];
  on(name: string): void;
}

function Folders ({ folders, on }: Props) {
  return (
    <div className={css.folders}>
      { folders.length
        ? folders.map((name, i) => {
          return (
            <ItemFolder name={name} key={i} select={on}/>
          )
        })
        : 'No existing projects'
      }
    </div>
  )
}

export default Folders
