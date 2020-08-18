import React from 'react'
import { SettingsContext } from '../../context'

export default function CheckBoxTheme () {
  const { darkTheme, changeTheme } = React.useContext(SettingsContext)

  const checked = darkTheme ? 'checked' : ''

  return (
    <div className="checkbox">
      <label className={`custom-checkbox ${checked}`} onClick={changeTheme}>
        <span className="custom-checkbox-button"></span>
      </label>
    </div>
  )
}
