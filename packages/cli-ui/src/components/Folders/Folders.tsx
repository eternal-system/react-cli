import React from 'react'

import ItemFolder from './ItemFolder'

import css from './style.module.scss'

interface Props {
  /** @TODO add to real types */
  folders: string[];
  onSelect(name: string): void;
}

function Folders ({ folders, onSelect }: Props) {
  function renderFoulderList () {
    return folders.map((name, i) => {
      return (
        <ItemFolder name={name} key={i} select={onSelect}/>
      )
    })
  }

  return (
    <div className={css.folders}>
      { renderFoulderList() }
    </div>
  )
}

export default Folders
