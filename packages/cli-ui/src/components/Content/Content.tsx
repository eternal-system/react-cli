import React from 'react'

function Content ({ children }: React.PropsWithChildren<React.ReactNode>) {
  return (
    <div className="content" >
      <div className="content__text">
        {children}
      </div>
    </div>
  )
}

export default Content
