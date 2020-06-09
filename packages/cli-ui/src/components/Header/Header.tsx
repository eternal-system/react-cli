import React from 'react'

const Header = () => {
  return (
    <header style={{
      backgroundColor: '#20232a',
      color: '#ffffff',
      position: 'fixed',
      zIndex: 1,
      width: '100%',
      top: 0,
      left: 0
    }}>
      <div style={{
        maxWidth: '1260px',
        width: '90%',
        paddingLeft: '20px',
        paddingRight: '20px',
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <div style={{
          display: 'flex',
          overflowX: 'auto',
          overflowY: 'hidden'
        }}>
          <a href="#" style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            fontSize: '18px',
            color: '#fff'
          }}> Tab 1 </a>
          <a href="#" style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            fontSize: '18px',
            color: '#fff'
          }}> Tab 2 </a>
          <a href="#" style={{
            paddingLeft: '20px',
            paddingRight: '20px',
            fontSize: '18px',
            color: '#fff'
          }}> Tab 3 </a>
        </div>
      </div>
    </header>
  )
}

export default Header
