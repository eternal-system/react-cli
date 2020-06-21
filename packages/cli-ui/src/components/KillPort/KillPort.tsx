import React from 'react'
import css from './style.module.css'

export default function KillPort () {
  const handleKill = () => {
    console.log('kill port')
  }

  return (
    <div className={css.wrapperCard}>
      <div className={css.killPors}>
        <div className={css.title}>Kill Port</div>
        <div className={css.content}>
          <input type="number" name=" " id=""/>
          <button onClick={() => handleKill}>Kill</button>
        </div>
      </div>
    </div>
  )
}
