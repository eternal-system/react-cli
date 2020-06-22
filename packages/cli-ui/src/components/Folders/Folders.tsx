import React from 'react'
import ItemFolder from './ItemFolder'

interface IFolders {
  /** @TODO add to real types */
  folders: string[];
  on(name: string): void;
}

function Folders ({ folders, on }: IFolders) {
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
