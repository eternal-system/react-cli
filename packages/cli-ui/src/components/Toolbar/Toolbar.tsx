import React from 'react'

interface IProps {
    update?: () => void
}

const Toolbar: React.FC<IProps> = ({ update }) => {
  return (
    <div className="toolbar">
      <button>^</button>
      <button onClick={update}>reset</button>
    </div>
  )
}

export default Toolbar
