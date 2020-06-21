import React, { useState, useEffect } from 'react'

function CheckBoxTheme () {
  const [check, onChecked] = useState(false)

  const checked = check ? 'checked' : ''

  const onSetCheck = () => {
    onChecked(localStorage.setItem('checked', JSON.stringify(!check)))
  }

  useEffect(() => {
    const checkout = JSON.parse(localStorage.getItem('checked')) ? JSON.parse(localStorage.getItem('checked')) : false
    onChecked(checkout)
  }, [check])

  return (
    <div>
      <label className={`custom-checkbox ${checked}`} onClick={onSetCheck}>
        <span className="custom-checkbox-button"></span>
      </label>
    </div>
  )
}

export default CheckBoxTheme
