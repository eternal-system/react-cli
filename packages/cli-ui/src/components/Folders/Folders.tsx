import React from 'react'

// Item Folder
const ItemFolder = ({ name, select }: any) => {
  return (
    <div className="folder-explorer-item" onClick={() => select(name)}>
      <div className="folder-name" >
        {name}
      </div>
    </div>
  )
}

interface IFolders {
  folders: any[];
  on: (name: string) => void;
}

// Folders
const Folders = ({ folders, on }: IFolders) => {
  // console.log('folders', folders)

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
