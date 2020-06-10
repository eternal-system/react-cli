import React from 'react'
import type { Node } from 'react'

const Content = ({ children }: Node) => {
  return (
    <div className="content" >
      <div className="content__text">
        {children}
      </div>
    </div>
  )
}

export default Content
