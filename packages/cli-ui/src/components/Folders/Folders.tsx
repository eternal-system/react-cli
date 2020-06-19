import React from 'react'

import ItemFolder from './ItemFolder'

interface IFolders {
  /** @TODO add to real types */
  folders: any[];
  on(name: string): void;
}

// Folders
function Folders ({ folders, on }: IFolders) {
  console.log('folders', folders)

  return (
    <div className="folders">
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
