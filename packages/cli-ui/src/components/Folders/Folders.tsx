import React from 'react'

// Item Folder
const ItemFolder = ({ name }: any) => {
  return (
    <div className="folder-explorer-item" >
      <div className="folder-name">
        {name}
      </div>
    </div>
  )
}

// Folders
const Folders = ({ folders }: any[]) => {
  console.log('folders', folders)

  return (
    <div className="folders">
      { folders.length
        ? folders.map((name, i) => {
          return (
            <ItemFolder name={name} key={i}/>
          )
        })
        : 'No existing projects'
      }
    </div>
  )
}

export default Folders
