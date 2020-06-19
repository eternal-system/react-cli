import React from 'react'

// Item Folder
export default function ItemFolder ({ name, select }: any) {
  return (
    <div className="folder-explorer-item" onClick={() => select(name)}>
      <div className="folder-name" >
        {name}
      </div>
    </div>
  )
}
