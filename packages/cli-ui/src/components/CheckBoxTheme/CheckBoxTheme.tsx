import React, { useState, useEffect, useContext } from 'react'
import {Context} from '../../context'
import css from './style.module.scss'

function CheckBoxTheme () {
  const [check, onChecked] = useState(false)

  const checked = check ? 'checked' : ''

  const {getValue} = useContext(Context)

  const onSetCheck = () => {
    // onChecked(localStorage.setItem('thememode', JSON.stringify(!check)))
    getValue(onChecked(localStorage.setItem('thememode', JSON.stringify(!check))))
  }

  useEffect(() => {
    const checkout = JSON.parse(localStorage.getItem('thememode')) ? JSON.parse(localStorage.getItem('thememode')) : false
    onChecked(checkout)
  }, [check])

  return (
    <div className="checkbox">
      <label className={`custom-checkbox ${checked}`} onClick={onSetCheck}>
        <span className="custom-checkbox-button"></span>
      </label>
    </div>
  )
}

export default CheckBoxTheme
