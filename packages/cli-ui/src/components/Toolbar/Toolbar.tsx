import React from 'react'

interface IProps {
    update?: () => void;
    back?: () => void;
    path?: string;
}

const Toolbar: React.FC<IProps> = ({ update, path, back }) => {
  return (
    <div className="toolbar">
      <button onClick={back}>^</button>
      Path: <span>{path}</span>
      <button onClick={update}>reset</button>
    </div>
  )
}

export default Toolbar
