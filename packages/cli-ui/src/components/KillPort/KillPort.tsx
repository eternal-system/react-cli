import React, { useState } from 'react'

import css from './style.module.scss'

export default function KillPort () {
  const [value, setValue] = useState()

  const handleKill = (ev: any) => {
    ev.preventDefault()
    console.log('kill port', value)
    fetch(`/api/kill?port=${value}`)
      .then(response => response.json())
      .then(res => {
        console.log(res)
      }).catch((err) => {
        console.log(err)
      })
  }

  const handleChange = (ev: any) => {
    console.log(ev.target.value)
    setValue(ev.target.value)
  }

  return (
    <div className={css.wrapperCard}>
      <div className={css.killPors}>
        <div className={css.title}>Kill Port</div>
        <div className={css.content}>
          <input type="number" value={value} onChange={handleChange} />
          <button onClick={handleKill}>Kill</button>
        </div>
      </div>
    </div>
  )
}
