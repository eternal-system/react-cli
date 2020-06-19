import React from 'react'

interface Props {
  update?(): void;
  back?(): void;
  path?: string;
}

export default function Toolbar ({ update, path, back }: Props) {
  return (
    <div className="toolbar">
      <button onClick={back}>^</button>
      Path: <span>{path}</span>
      <button onClick={update}>reset</button>
    </div>
  )
}
